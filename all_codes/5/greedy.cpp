#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void assignTasks(vector<int>& tasks, vector<int>& team_load) {
    sort(tasks.begin(), tasks.end(), greater<int>()); // Sort tasks by effort
    
    for (int effort : tasks) {
        auto min_load = min_element(team_load.begin(), team_load.end());
        *min_load += effort; // Assign to least busy member
    }
    
    cout << "Final team workloads:\n";
    for (int i = 0; i < team_load.size(); i++)
        cout << "Member " << i << ": " << team_load[i] << " effort units\n";
}

int main() {
    vector<int> tasks = {8, 5, 3, 2, 7}; // Task efforts
    vector<int> team_load(3, 0);         // 3 team members
    
    assignTasks(tasks, team_load);
    return 0;
}

/**
 * How This Solves the Challenge:
 * - Assigns high-effort tasks first to least busy members.
 * - Balances workloads (e.g., avoids overloading one designer).
 * - Operates in O(NlogK) time for N tasks and K resources.
 */