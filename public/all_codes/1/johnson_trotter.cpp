#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

void printPermutation(const vector<int> &perm) {
    for (int val : perm)
        cout << val << " ";
    cout << endl;
}

int main() {
    vector<int> tasks = {1, 2, 3}; // 1: Flight, 2: Hotel, 3: Insurance

    cout << "✅ All task orderings for offline testing:\n";
    sort(tasks.begin(), tasks.end());
    do {
        cout << "→ ";
        printPermutation(tasks);
    } while (next_permutation(tasks.begin(), tasks.end()));

    return 0;
}
