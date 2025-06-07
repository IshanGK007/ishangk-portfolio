#include <iostream>
#include <deque>
#include <vector>
#include <climits>
using namespace std;

class TrafficMonitor {
    deque<pair<int, int>> window; // {timestamp, value}
    int windowSize;
    int currentSum = 0;
    
public:
    TrafficMonitor(int size) : windowSize(size) {}
    
    void addDataPoint(int timestamp, int value) {
        // Remove old data points
        while (!window.empty() && window.front().first <= timestamp - windowSize) {
            currentSum -= window.front().second;
            window.pop_front();
        }
        
        // Add new data point
        window.emplace_back(timestamp, value);
        currentSum += value;
        
        cout << "Added data point: " << value 
             << " at " << timestamp << endl;
    }
    
    double getAverage() {
        if (window.empty()) return 0;
        return static_cast<double>(currentSum) / window.size();
    }
    
    bool detectSpike(int threshold) {
        if (window.size() < 2) return false;
        
        int last = window.back().second;
        double avg = getAverage();
        double spikeLevel = last / avg;
        
        if (spikeLevel > threshold) {
            cout << "Spike detected! Current: " << last 
                 << ", Average: " << avg 
                 << ", Ratio: " << spikeLevel << endl;
            return true;
        }
        return false;
    }
    
    void monitorTraffic(int timestamp, int requests) {
        addDataPoint(timestamp, requests);
        if (detectSpike(2.0)) { // Threshold of 2x average
            cout << "ALERT: Traffic spike detected at " 
                 << timestamp << endl;
            // Trigger auto-scaling or other mitigation
        }
    }
};

int main() {
    TrafficMonitor monitor(5); // 5-second window
    
    // Simulate traffic data (timestamp, requests)
    vector<pair<int, int>> trafficData = {
        {1, 100}, {2, 120}, {3, 110}, {4, 105}, {5, 115},
        {6, 500}, {7, 130}, {8, 125}, {9, 110}, {10, 100}
    };
    
    for (auto& data : trafficData) {
        monitor.monitorTraffic(data.first, data.second);
    }
    
    return 0;
}