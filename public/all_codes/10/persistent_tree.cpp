#include <iostream>
#include <vector>
using namespace std;

// Node structure for Persistent Segment Tree
struct Node {
    int value;
    Node *left, *right;
    Node(int v = 0) : value(v), left(nullptr), right(nullptr) {}
};

// Persistent Segment Tree class to manage customer interaction history
class PersistentSegmentTree {
    vector<Node*> versions; // Stores different versions of the tree
    int n; // size of original array

    // Build initial tree
    Node* build(const vector<int>& data, int l, int r) {
        if (l == r) return new Node(data[l]);

        int mid = (l + r) / 2;
        Node* left = build(data, l, mid);
        Node* right = build(data, mid + 1, r);

        Node* root = new Node(left->value + right->value);
        root->left = left;
        root->right = right;
        return root;
    }

    // Update tree and create new version
    Node* update(Node* prev, int l, int r, int idx, int value) {
        if (l == r) return new Node(value);

        int mid = (l + r) / 2;
        Node* root = new Node();
        if (idx <= mid) {
            root->left = update(prev->left, l, mid, idx, value);
            root->right = prev->right;
        } else {
            root->left = prev->left;
            root->right = update(prev->right, mid + 1, r, idx, value);
        }
        root->value = root->left->value + root->right->value;
        return root;
    }

    // Query a specific index value from a specific version
    int query(Node* node, int l, int r, int idx) {
        if (l == r) return node->value;
        int mid = (l + r) / 2;
        if (idx <= mid) return query(node->left, l, mid, idx);
        else return query(node->right, mid + 1, r, idx);
    }

public:
    PersistentSegmentTree(const vector<int>& data) {
        n = data.size();
        versions.push_back(build(data, 0, n - 1));
    }

    // Add new interaction to customer history (creates a new version)
    void addInteraction(int version, int idx, int value) {
        Node* new_version = update(versions[version], 0, n - 1, idx, value);
        versions.push_back(new_version);
    }

    // Get interaction value at a specific index from a specific version
    int getHistory(int version, int idx) {
        return query(versions[version], 0, n - 1, idx);
    }

    int latestVersion() const { return versions.size() - 1; }
};

int main() {
    // Problem: Need to efficiently track and recall customer interaction history
    // Solution: Persistent Segment Tree maintains versions of customer data

    vector<int> initialInteractions = {5, 3, 7, 2}; // Initial interaction metrics
    PersistentSegmentTree pst(initialInteractions);

    // Add new interactions
    pst.addInteraction(0, 1, 6); // version 1: update index 1
    pst.addInteraction(1, 3, 9); // version 2: update index 3

    // Retrieve history from each version
    cout << "Version 0 (initial), index 1: " << pst.getHistory(0, 1) << endl; // 3
    cout << "Version 1 (updated idx 1), index 1: " << pst.getHistory(1, 1) << endl; // 6
    cout << "Version 2 (updated idx 3), index 3: " << pst.getHistory(2, 3) << endl; // 9
    cout << "Version 0, index 3: " << pst.getHistory(0, 3) << endl; // 2

    return 0;
}
