#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

class SparseTable {
    vector<vector<int>> table;
public:
    SparseTable(vector<int>& features) {
        int n = features.size();
        int logn = log2(n) + 1;
        table.resize(n, vector<int>(logn));
        
        for (int i = 0; i < n; i++)
            table[i][0] = features[i];
            
        for (int j = 1; (1 << j) <= n; j++)
            for (int i = 0; i + (1 << j) <= n; i++)
                table[i][j] = max(table[i][j-1], table[i + (1<<(j-1))][j-1]);
    }
    
    int query(int l, int r) {
        int k = log2(r - l + 1);
        return max(table[l][k], table[r - (1<<k) + 1][k]);
    }
};

int main() {
    // Feature array (e.g., color histogram values)
    vector<int> features = {4, 2, 3, 7, 1, 5, 3, 3, 9, 2};
    SparseTable st(features);
    
    // Query max feature in range (e.g., dominant color in region)
    cout << "Dominant feature value in range [2,7]: " 
         << st.query(2, 7) << endl;
    return 0;
}

/**
 * How This Solves the Challenge:
 * - Enables O(1) queries for dominant style features (e.g., max color intensity).
 * - Eliminates redundant processing during moodboard assembly.
 * - Reduces feature extraction time from O(P) to O(1) per query.
 */