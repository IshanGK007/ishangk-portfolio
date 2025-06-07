#include <iostream>
#include <queue>
#include <vector>
#include <unordered_map>
using namespace std;

int ucs(vector<vector<pair<int,int>>>& graph, int start, int goal) {
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    unordered_map<int, int> cost_so_far;
    
    pq.push({0, start});
    cost_so_far[start] = 0;
    
    while (!pq.empty()) {
        int current = pq.top().second;
        int cost = pq.top().first;
        pq.pop();
        
        if (current == goal) return cost;
        
        for (auto [next, edge_cost] : graph[current]) {
            int new_cost = cost + edge_cost;
            if (!cost_so_far.count(next) || new_cost < cost_so_far[next]) {
                cost_so_far[next] = new_cost;
                pq.push({new_cost, next});
            }
        }
    }
    return -1;
}

int main() {
    // Dynamic task graph with updated costs
    vector<vector<pair<int,int>>> workflow = {
        {{1, 2}, {2, 4}},    // Original paths
        {{3, 5}},
        {{3, 1}, {4, 3}},
        {{5, 2}},
        {{5, 4}},
        {}
    };
    
    // Urgent task inserted: 2 → 6 → 5 with cost 2
    workflow[2].push_back({6, 1});
    workflow.push_back({{5, 1}}); // Task 6
    
    cout << "Optimal cost with urgent path: " 
         << ucs(workflow, 0, 5) << endl;
    return 0;
}

/**
 * How This Solves the Challenge:
 * - Recalculates cheapest path when new tasks appear (e.g., urgent edit).
 * - Chooses 0→2→6→5 (cost=6) over 0→2→3→5 (cost=7).
 * - Adapts to runtime changes in O((E+V)logV) time.
 */