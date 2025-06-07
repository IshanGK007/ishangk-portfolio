// all_codes/2/trie.cpp
#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>

using namespace std;

struct TrieNode {
    unordered_map<string, TrieNode*> children;
    bool isEnd = false;
};

class Trie {
    TrieNode* root;

public:
    Trie() { root = new TrieNode(); }

    void insert(vector<string> sequence) {
        TrieNode* node = root;
        for (const string &action : sequence) {
            if (!node->children.count(action))
                node->children[action] = new TrieNode();
            node = node->children[action];
        }
        node->isEnd = true;
    }

    bool search(vector<string> sequence) {
        TrieNode* node = root;
        for (const string &action : sequence) {
            if (!node->children.count(action))
                return false;
            node = node->children[action];
        }
        return node->isEnd;
    }
};

int main() {
    Trie behaviorTrie;

    // Insert common behavior patterns
    behaviorTrie.insert({"view", "add_to_cart", "abandon"});
    behaviorTrie.insert({"view", "add_to_cart", "purchase"});

    // Querying real-time sequence
    vector<string> user1 = {"view", "add_to_cart", "abandon"};
    vector<string> user2 = {"view", "wishlist"};

    cout << "✅ Detecting behavior patterns:\n";
    cout << "→ User 1 pattern found: " << (behaviorTrie.search(user1) ? "Yes" : "No") << endl;
    cout << "→ User 2 pattern found: " << (behaviorTrie.search(user2) ? "Yes" : "No") << endl;

    return 0;
}
