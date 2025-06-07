#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

// Structure to represent a query range
struct Query {
    int l, r, idx;
};

// Mo's algorithm for processing historical queries efficiently
class HistoricalQueryProcessor {
    vector<int> data;
    static int blockSize; // Static so it can be used inside comparator

    // Mo's order comparison
    static bool compareQueries(const Query& a, const Query& b) {
        int blockA = a.l / blockSize;
        int blockB = b.l / blockSize;
        if (blockA != blockB)
            return blockA < blockB;
        return (blockA & 1) ? (a.r > b.r) : (a.r < b.r);
    }

public:
    HistoricalQueryProcessor(const vector<int>& historicalData) {
        data = historicalData;
        blockSize = static_cast<int>(sqrt(data.size()));
    }

    // Process batch of historical queries using Mo's algorithm
    vector<int> processQueries(vector<Query>& queries) {
        sort(queries.begin(), queries.end(), compareQueries);

        vector<int> results(queries.size());
        int currentL = 0, currentR = -1, currentSum = 0;

        for (const Query& q : queries) {
            // Expand or shrink current range
            while (currentL > q.l) {
                currentL--;
                currentSum += data[currentL];
            }
            while (currentR < q.r) {
                currentR++;
                currentSum += data[currentR];
            }
            while (currentL < q.l) {
                currentSum -= data[currentL];
                currentL++;
            }
            while (currentR > q.r) {
                currentSum -= data[currentR];
                currentR--;
            }
            results[q.idx] = currentSum;
        }
        return results;
    }
};

int HistoricalQueryProcessor::blockSize = 0; // Define static member

int main() {
    // Problem: Efficiently compute range-based view totals for reports
    // Solution: Mo's Algorithm for optimal range query processing

    // Sample data: 30 days of asset views
    vector<int> dailyViews(30);
    for (int i = 0; i < 30; i++) {
        dailyViews[i] = 100 + rand() % 50; // Random views between 100 and 149
    }

    HistoricalQueryProcessor processor(dailyViews);

    // Weekly queries
    vector<Query> queries = {
        {0, 6, 0},   // Week 1
        {7, 13, 1},  // Week 2
        {14, 20, 2}, // Week 3
        {21, 27, 3}, // Week 4
        {0, 29, 4}   // Full month
    };

    vector<int> results = processor.processQueries(queries);

    cout << "📊 Historical View Reports:\n";
    cout << "Week 1: " << results[0] << " views\n";
    cout << "Week 2: " << results[1] << " views\n";
    cout << "Week 3: " << results[2] << " views\n";
    cout << "Week 4: " << results[3] << " views\n";
    cout << "Full Month: " << results[4] << " views\n";

    // Demonstrates Mo's Algorithm benefits:
    // 🔹 Efficient batch query
    // 🔹 Minimal data reprocessing
    // 🔹 Scales well with large query sets

    return 0;
}
