#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

// Edmonds-Karp Algorithm for Max-Flow
int bfs(vector<vector<int>>& graph, int s, int t, vector<int>& parent) {
    fill(parent.begin(), parent.end(), -1);
    queue<pair<int, int>> q;
    q.push({s, INT_MAX});
    while (!q.empty()) {
        int u = q.front().first, flow = q.front().second;
        q.pop();
        for (int v = 0; v < graph.size(); v++) {
            if (parent[v] == -1 && graph[u][v] > 0) {
                parent[v] = u;
                int new_flow = min(flow, graph[u][v]);
                if (v == t) return new_flow;
                q.push({v, new_flow});
            }
        }
    }
    return 0;
}

int maxFlow(vector<vector<int>>& graph, int s, int t) {
    int flow = 0;
    vector<int> parent(graph.size());
    while (int new_flow = bfs(graph, s, t, parent)) {
        flow += new_flow;
        for (int v = t; v != s; v = parent[v]) {
            int u = parent[v];
            graph[u][v] -= new_flow;
            graph[v][u] += new_flow;
        }
    }
    return flow;
}

int main() {
    // Agents: 0=Source, 1=Inventory, 2=Email, 3=Chatbot, 4=Sink
    vector<vector<int>> graph = {
        {0, 10, 5, 0, 0},  // Source -> Agents
        {0, 0, 0, 8, 0},   // Inventory -> Chatbot
        {0, 0, 0, 0, 7},    // Email -> Sink
        {0, 0, 0, 0, 10},  // Chatbot -> Sink
        {0, 0, 0, 0, 0}     // Sink
    };
    cout << "Max Flow (Resource Throughput): " << maxFlow(graph, 0, 4) << endl;
    return 0;
}

/**
 * How This Solves the Challenge:
 * - Models agents as nodes with capacities (e.g., server resources).
 * - Allocates max resources to critical paths (e.g., inventory → chatbot).
 * - Prevents bottlenecks by balancing flow dynamically.
 */