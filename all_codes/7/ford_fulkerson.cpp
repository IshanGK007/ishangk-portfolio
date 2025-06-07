#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

class VideoLocalizationPipeline {
    vector<vector<int>> capacity;
    vector<vector<int>> flow;
    vector<int> parent;
    int numNodes;

    bool bfs(int source, int sink) {
        fill(parent.begin(), parent.end(), -1);
        parent[source] = -2;
        queue<pair<int, int>> q;
        q.push({source, INT_MAX});

        while (!q.empty()) {
            int current = q.front().first;
            int currentFlow = q.front().second;
            q.pop();

            for (int next = 0; next < numNodes; next++) {
                if (parent[next] == -1 && capacity[current][next] - flow[current][next] > 0) {
                    parent[next] = current;
                    int newFlow = min(currentFlow, capacity[current][next] - flow[current][next]);
                    if (next == sink) return newFlow;
                    q.push({next, newFlow});
                }
            }
        }
        return 0;
    }

public:
    VideoLocalizationPipeline(int n) : numNodes(n), 
        capacity(n, vector<int>(n, 0)), 
        flow(n, vector<int>(n, 0)), 
        parent(n) {}

    void addEdge(int from, int to, int cap) {
        capacity[from][to] += cap;
    }

    int maxFlow(int source, int sink) {
        int maxFlow = 0;
        int newFlow;

        while ((newFlow = bfs(source, sink))) {
            maxFlow += newFlow;
            int current = sink;
            while (current != source) {
                int prev = parent[current];
                flow[prev][current] += newFlow;
                flow[current][prev] -= newFlow;
                current = prev;
            }
        }
        return maxFlow;
    }
};

int main() {
    // Nodes: 0=Source, 1=Lip-sync, 2=Subtitles, 3=Format, 4=Output
    VideoLocalizationPipeline pipeline(5);
    
    // Define pipeline connections and capacities
    pipeline.addEdge(0, 1, 10); // Source -> Lip-sync
    pipeline.addEdge(0, 2, 15); // Source -> Subtitles
    pipeline.addEdge(1, 3, 5);  // Lip-sync -> Format
    pipeline.addEdge(2, 3, 10); // Subtitles -> Format
    pipeline.addEdge(1, 4, 5);  // Lip-sync -> Output
    pipeline.addEdge(2, 4, 5);  // Subtitles -> Output
    pipeline.addEdge(3, 4, 10); // Format -> Output

    cout << "Maximum throughput of the pipeline: " 
         << pipeline.maxFlow(0, 4) << " videos per hour" << endl;

    return 0;
}
