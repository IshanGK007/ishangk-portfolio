#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

void pagerank(vector<vector<int>>& graph, float damping = 0.85, float tol = 1e-5) {
    int n = graph.size();
    vector<float> rank(n, 1.0 / n);
    vector<int> out_degree(n, 0);
    
    // Calculate out-degree for each node
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            out_degree[i] += graph[i][j];

    // Power iteration
    while (true) {
        vector<float> new_rank(n, 0.0);
        float diff = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (graph[j][i]) 
                    new_rank[i] += rank[j] / out_degree[j];
            }
            new_rank[i] = damping * new_rank[i] + (1 - damping) / n;
            diff += abs(new_rank[i] - rank[i]);
        }
        rank = new_rank;
        if (diff < tol) break;
    }

    // Print ranked actions (agents)
    cout << "Action Priority Scores:" << endl;
    for (int i = 0; i < n; i++)
        cout << "Agent " << i << ": " << rank[i] << endl;
}

int main() {
    // Adjacency matrix: Agents influence each other (e.g., 1→2 = email depends on inventory)
    vector<vector<int>> graph = {
        {0, 1, 1, 0},  // Agent 0 (Source)
        {0, 0, 1, 1},  // Agent 1 (Inventory)
        {1, 0, 0, 0},  // Agent 2 (Email)
        {0, 0, 1, 0}   // Agent 3 (Chatbot)
    };
    pagerank(graph);
    return 0;
}

/**
 * How This Solves the Challenge:
 * - Assigns higher scores to actions with more dependencies (e.g., inventory → email).
 * - Prioritizes high-impact agents (e.g., personalized offers over routine updates).
 * - Dynamically adapts to changing workflows.
 */