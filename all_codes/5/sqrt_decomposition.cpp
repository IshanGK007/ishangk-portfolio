#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

class TaskManager {
    vector<int> tasks, blocks;
    int block_size;
public:
    TaskManager(vector<int>& t) : tasks(t) {
        block_size = sqrt(tasks.size());
        blocks.resize((tasks.size() + block_size - 1) / block_size, 0);
        
        for (int i = 0; i < tasks.size(); i++)
            blocks[i / block_size] += tasks[i];
    }
    
    void update(int idx, int val) {
        blocks[idx / block_size] += val - tasks[idx];
        tasks[idx] = val;
    }
    
    int query(int l, int r) {
        int sum = 0;
        while (l <= r) {
            if (l % block_size == 0 && l + block_size - 1 <= r) {
                sum += blocks[l / block_size];
                l += block_size;
            } else {
                sum += tasks[l];
                l++;
            }
        }
        return sum;
    }
};

int main() {
    vector<int> tasks(100, 1); // 100 tasks (1=active, 0=done)
    TaskManager tm(tasks);
    
    cout << "Active tasks in [10,50]: " << tm.query(10, 50) << endl;
    tm.update(25, 0); // Mark task 25 as done
    cout << "Updated active tasks: " << tm.query(10, 50) << endl;
    return 0;
}

/**
 * How This Solves the Challenge:
 * - Groups 100 social media posts into √100=10 blocks.
 * - Enables O(√N) status updates/queries (vs. O(N)).
 * - Scales to 10,000+ tasks with only 100-block overhead.
 */