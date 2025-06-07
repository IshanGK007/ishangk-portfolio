#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class SubtitleGroupManager {
    unordered_map<string, string> parent;
    unordered_map<string, int> rank;

public:
    void makeSet(const string& subtitleId) {
        parent[subtitleId] = subtitleId;
        rank[subtitleId] = 0;
    }

    string find(const string& subtitleId) {
        if (parent[subtitleId] != subtitleId)
            parent[subtitleId] = find(parent[subtitleId]); // Path compression
        return parent[subtitleId];
    }

    void unionSets(const string& a, const string& b) {
        string rootA = find(a);
        string rootB = find(b);

        if (rootA == rootB) return;

        // Union by rank
        if (rank[rootA] > rank[rootB]) {
            parent[rootB] = rootA;
        } else {
            parent[rootA] = rootB;
            if (rank[rootA] == rank[rootB])
                rank[rootB]++;
        }
    }

    bool areConnected(const string& a, const string& b) {
        return find(a) == find(b);
    }
};

int main() {
    SubtitleGroupManager manager;
    
    // Create subtitle segments for different languages
    vector<string> englishSegments = {"en_seg1", "en_seg2", "en_seg3"};
    vector<string> spanishSegments = {"es_seg1", "es_seg2", "es_seg3"};
    vector<string> japaneseSegments = {"jp_seg1", "jp_seg2", "jp_seg3"};
    
    // Initialize all segments
    for (const auto& seg : englishSegments) manager.makeSet(seg);
    for (const auto& seg : spanishSegments) manager.makeSet(seg);
    for (const auto& seg : japaneseSegments) manager.makeSet(seg);
    
    // Connect corresponding segments across languages
    for (int i = 0; i < 3; i++) {
        manager.unionSets(englishSegments[i], spanishSegments[i]);
        manager.unionSets(englishSegments[i], japaneseSegments[i]);
    }
    
    // Verify connections
    cout << "Are segment 1 translations connected? " 
         << (manager.areConnected("en_seg1", "jp_seg1") ? "Yes" : "No") << endl;
    cout << "Are segment 1 and 2 connected across languages? " 
         << (manager.areConnected("en_seg1", "es_seg2") ? "Yes" : "No") << endl;
    
    return 0;
}