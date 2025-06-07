#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class PerformanceAnalyzer {
    vector<int> parent;
    vector<int> rank;
    unordered_map<string, int> componentIds;
    int nextId = 0;
    
    int find(int u) {
        if (parent[u] != u)
            parent[u] = find(parent[u]); // Path compression
        return parent[u];
    }
    
    void unionSets(int u, int v) {
        u = find(u);
        v = find(v);
        if (u == v) return;
        
        // Union by rank
        if (rank[u] > rank[v]) {
            parent[v] = u;
        } else {
            parent[u] = v;
            if (rank[u] == rank[v])
                rank[v]++;
        }
    }
    
public:
    PerformanceAnalyzer() {
        // Initialize with some common components
        registerComponent("Database");
        registerComponent("CDN");
        registerComponent("ImageProcessor");
    }
    
    int registerComponent(const string& name) {
        if (!componentIds.count(name)) {
            componentIds[name] = nextId;
            parent.push_back(nextId);
            rank.push_back(0);
            nextId++;
        }
        return componentIds[name];
    }
    
    void linkRelatedIssues(const string& comp1, const string& comp2) {
        int id1 = registerComponent(comp1);
        int id2 = registerComponent(comp2);
        unionSets(id1, id2);
        cout << "Linked performance issues between " << comp1 
             << " and " << comp2 << endl;
    }
    
    bool areRelated(const string& comp1, const string& comp2) {
        if (!componentIds.count(comp1) return false;
        if (!componentIds.count(comp2)) return false;
        return find(componentIds[comp1]) == find(componentIds[comp2]);
    }
    
    void analyzeBottleneck(const string& component) {
        cout << "Performance issues in " << component << " may affect: ";
        if (!componentIds.count(component)) {
            cout << "None (new component)" << endl;
            return;
        }
        
        int root = find(componentIds[component]);
        bool first = true;
        for (auto& [name, id] : componentIds) {
            if (find(id) == root && name != component) {
                if (!first) cout << ", ";
                cout << name;
                first = false;
            }
        }
        cout << endl;
    }
};

int main() {
    PerformanceAnalyzer analyzer;
    
    // Link related performance issues
    analyzer.linkRelatedIssues("Database", "UserProfileService");
    analyzer.linkRelatedIssues("CDN", "ImageLoader");
    analyzer.linkRelatedIssues("ImageProcessor", "ThumbnailGenerator");
    
    // Detect a bottleneck
    analyzer.analyzeBottleneck("Database");
    analyzer.analyzeBottleneck("CDN");
    
    // Check if components are related
    if (analyzer.areRelated("ImageLoader", "CDN")) {
        cout << "ImageLoader and CDN issues are related" << endl;
    }
    
    return 0;
}