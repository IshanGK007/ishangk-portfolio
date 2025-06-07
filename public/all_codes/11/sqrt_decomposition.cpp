#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

// Manages metadata with efficient range queries using Square-Root Decomposition
class AssetMetadataManager {
    vector<int> metadata; // Original metadata values
    vector<int> blocks;   // Precomputed block sums
    int blockSize;        // Size of each block

public:
    // Constructor: initializes metadata and builds block sums
    AssetMetadataManager(const vector<int>& data) {
        metadata = data;
        int n = metadata.size();
        blockSize = static_cast<int>(sqrt(n));
        int numBlocks = (n + blockSize - 1) / blockSize;
        blocks.resize(numBlocks, 0);

        for (int i = 0; i < n; ++i)
            blocks[i / blockSize] += metadata[i];
    }

    // Point update: updates metadata value at index
    void update(int index, int newValue) {
        if (index < 0 || index >= metadata.size()) return; // safety check
        int blockIdx = index / blockSize;
        blocks[blockIdx] += newValue - metadata[index];
        metadata[index] = newValue;
    }

    // Range query: computes sum from index l to r
    int queryRange(int l, int r) {
        int n = metadata.size();
        if (l > r || l < 0 || r >= n) return 0; // safety check

        int sum = 0;
        int startBlock = l / blockSize;
        int endBlock = r / blockSize;

        if (startBlock == endBlock) {
            // Query lies within one block
            for (int i = l; i <= r; ++i)
                sum += metadata[i];
        } else {
            // First partial block
            for (int i = l; i < (startBlock + 1) * blockSize; ++i)
                sum += metadata[i];

            // Full blocks in between
            for (int b = startBlock + 1; b < endBlock; ++b)
                sum += blocks[b];

            // Last partial block
            for (int i = endBlock * blockSize; i <= r; ++i)
                sum += metadata[i];
        }
        return sum;
    }
};

int main() {
    // Problem: Efficient bulk metadata queries for campaign analytics
    // Solution: Use square-root decomposition to speed up queries

    vector<int> assetMetadata = {3, 5, 2, 7, 6, 4, 9, 8, 1, 5, 3, 2};
    AssetMetadataManager manager(assetMetadata);

    // Querying metadata
    cout << "Total views for assets 2-5: " << manager.queryRange(2, 5) << endl;
    cout << "Total views for assets 0-11: " << manager.queryRange(0, 11) << endl;

    // Update metadata at a specific index
    manager.update(3, 10); // Update asset at index 3 to 10
    cout << "After update, total for 2-5: " << manager.queryRange(2, 5) << endl;

    // Demonstrates efficient read/write on large-scale campaign metadata
    return 0;
}
