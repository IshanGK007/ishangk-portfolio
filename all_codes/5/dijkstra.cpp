#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

void dijkstra(vector<vector<pair<int,int>>>& graph, int start) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    
    dist[start] = 0;
    pq.push({0, start});
    
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        
        for (auto [v, weight] : graph[u]) {
            if (dist[v] > dist[u] + weight) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    
    cout << "Critical path durations from task " << start << ":\n";
    for (int i = 0; i < n; i++)
        cout << "Task " << i << ": " << dist[i] << " hours\n";
}

int main() {
    // Task graph: {task, {dependent_task, hours_required}}
    vector<vector<pair<int,int>>> workflow = {
        {{1, 2}, {2, 4}},    // Task 0 → (1 in 2h), (2 in 4h)
        {{3, 5}},             // Task 1 → 3 in 5h
        {{3, 1}, {4, 3}},     // Task 2 → 3 in 1h, 4 in 3h
        {{5, 2}},             // Task 3 → 5 in 2h
        {{5, 4}},             // Task 4 → 5 in 4h
        {}                    // Task 5 (end)
    };
    dijkstra(workflow, 0);
    return 0;
}

/**
 * How This Solves the Challenge:
 * - Models tasks as nodes and dependencies as weighted edges.
 * - Identifies the longest (critical) path (e.g., 0→2→3→5 = 7h).
 * - Flags bottlenecks (e.g., Task 3's legal review) for prioritization.
 */