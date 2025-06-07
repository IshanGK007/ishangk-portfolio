#include <iostream>
#include <vector>
#include <bitset>
using namespace std;

class LogAnalyzer {
    vector<bitset<32>> normalPatterns;
    bitset<32> currentFingerprint;
    
public:
    void learnNormalPattern(const bitset<32>& pattern) {
        normalPatterns.push_back(pattern);
    }
    
    void processLogEntry(const bitset<32>& entry) {
        currentFingerprint ^= entry; // Update fingerprint
        
        // Check against known normal patterns
        bool isAnomaly = true;
        for (auto& pattern : normalPatterns) {
            int diff = (currentFingerprint ^ pattern).count();
            if (diff < 5) { // Threshold of 5 bit differences
                isAnomaly = false;
                break;
            }
        }
        
        if (isAnomaly) {
            cout << "ANOMALY DETECTED! Fingerprint: " 
                 << currentFingerprint << endl;
            // Reset fingerprint after detection
            currentFingerprint.reset();
        }
    }
    
    void analyzeLogBatch(const vector<bitset<32>>& logs) {
        cout << "Analyzing log batch..." << endl;
        for (const auto& log : logs) {
            processLogEntry(log);
        }
    }
};

int main() {
    LogAnalyzer analyzer;
    
    // Learn normal patterns
    analyzer.learnNormalPattern(bitset<32>("11001100110011001100110011001100"));
    analyzer.learnNormalPattern(bitset<32>("00110011001100110011001100110011"));
    
    // Generate sample logs
    vector<bitset<32>> logs;
    for (int i = 0; i < 20; i++) {
        if (i == 10) { // Insert anomaly
            logs.push_back(bitset<32>("11111111111111110000000000000000"));
        } else {
            logs.push_back(bitset<32>(i % 2 ? "11001100110011001100110011001100" : 
                                             "00110011001100110011001100110011"));
        }
    }
    
    // Analyze logs
    analyzer.analyzeLogBatch(logs);
    
    return 0;
}