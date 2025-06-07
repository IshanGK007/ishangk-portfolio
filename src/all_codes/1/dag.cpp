#include <iostream>
#include <vector>
#include <stack>

using namespace std;

// DAG Example: Enforces task dependency — flight must be booked before hotel

void topologicalSort(int v, vector<bool> &visited, stack<int> &Stack, vector<vector<int>> &adj) {
    visited[v] = true;
    for (int neighbor : adj[v])
        if (!visited[neighbor])
            topologicalSort(neighbor, visited, Stack, adj);
    Stack.push(v);
}

int main() {
    int V = 3; // 0: Search Flight, 1: Book Flight, 2: Book Hotel
    vector<vector<int>> adj(V);

    // Define dependencies (edges)
    adj[0].push_back(1); // Search → Book Flight
    adj[1].push_back(2); // Book Flight → Book Hotel

    stack<int> Stack;
    vector<bool> visited(V, false);

    // Topological sort ensures correct execution sequence
    for (int i = 0; i < V; i++)
        if (!visited[i])
            topologicalSort(i, visited, Stack, adj);

    cout << "✅ Executing tasks in logical order:\n";
    while (!Stack.empty()) {
        int task = Stack.top(); Stack.pop();
        if (task == 0) cout << "→ Search Flights\n";
        else if (task == 1) cout << "→ Book Flight\n";
        else if (task == 2) cout << "→ Book Hotel\n";
    }

    return 0;
}
