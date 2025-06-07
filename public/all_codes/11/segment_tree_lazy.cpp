#include <iostream>
#include <vector>
using namespace std;

class AssetMetricTracker {
    vector<int> tree;  // Segment tree for storing sums
    vector<int> lazy;  // Lazy tree for deferred updates
    int n;             // Size of the input array

    // Build segment tree
    void build(const vector<int>& data, int node, int start, int end) {
        if (start == end) {
            tree[node] = data[start];
        } else {
            int mid = (start + end) / 2;
            build(data, 2 * node, start, mid);
            build(data, 2 * node + 1, mid + 1, end);
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        }
    }

    // Propagate any pending updates
    void push(int node, int start, int end) {
        if (lazy[node] != 0) {
            tree[node] += (end - start + 1) * lazy[node];  // Apply pending update
            if (start != end) {  // Not a leaf node
                lazy[2 * node] += lazy[node];
                lazy[2 * node + 1] += lazy[node];
            }
            lazy[node] = 0;
        }
    }

    // Range update using lazy propagation
    void updateRange(int node, int start, int end, int l, int r, int val) {
        push(node, start, end);  // Apply any pending updates

        // No overlap
        if (r < start || end < l)
            return;

        // Total overlap
        if (l <= start && end <= r) {
            lazy[node] += val;
            push(node, start, end);
            return;
        }

        // Partial overlap
        int mid = (start + end) / 2;
        updateRange(2 * node, start, mid, l, r, val);
        updateRange(2 * node + 1, mid + 1, end, l, r, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    // Range query using lazy propagation
    int queryRange(int node, int start, int end, int l, int r) {
        push(node, start, end);  // Apply any pending updates

        // No overlap
        if (r < start || end < l)
            return 0;

        // Total overlap
        if (l <= start && end <= r)
            return tree[node];

        // Partial overlap
        int mid = (start + end) / 2;
        return queryRange(2 * node, start, mid, l, r) +
               queryRange(2 * node + 1, mid + 1, end, l, r);
    }

public:
    // Constructor
    AssetMetricTracker(const vector<int>& data) {
        n = data.size();
        tree.resize(4 * n);
        lazy.resize(4 * n, 0);
        build(data, 1, 0, n - 1);
    }

    // Public bulk update API
    void bulkUpdate(int l, int r, int val) {
        updateRange(1, 0, n - 1, l, r, val);
    }

    // Public bulk query API
    int bulkQuery(int l, int r) {
        return queryRange(1, 0, n - 1, l, r);
    }
};

int main() {
    // ✅ Use Case: Efficient metric tracking and reporting
    vector<int> assetMetrics = {15, 12, 18, 20, 10, 14, 16, 19, 11, 13};

    AssetMetricTracker tracker(assetMetrics);

    cout << "Initial metrics for assets 2-5: " << tracker.bulkQuery(2, 5) << endl;

    // Apply bulk updates
    tracker.bulkUpdate(1, 4, 5); // +5 to assets 1-4
    tracker.bulkUpdate(3, 7, 3); // +3 to assets 3-7

    cout << "Updated metrics for assets 2-5: " << tracker.bulkQuery(2, 5) << endl;
    cout << "Metrics for all assets: " << tracker.bulkQuery(0, 9) << endl;

    // ✅ Demonstrates how segment tree with lazy propagation:
    // 🔹 Supports fast updates on ranges
    // 🔹 Allows real-time metric analytics

    return 0;
}
