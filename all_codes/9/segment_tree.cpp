#include <iostream>
#include <vector>
#include <algorithm>
#include <cfloat> // For FLT_MAX and FLT_MIN
using namespace std;

struct CarProperty {
    float minPrice, maxPrice;
    int count;

    // Overloaded operator+ to combine properties
    CarProperty operator+(const CarProperty& other) const {
        return {
            std::min(minPrice, other.minPrice),
            std::max(maxPrice, other.maxPrice),
            count + other.count
        };
    }
};

class SegmentTree {
    vector<CarProperty> tree;
    int n;

    void build(const vector<CarProperty>& data, int node, int start, int end) {
        if (start == end) {
            tree[node] = data[start];
        } else {
            int mid = (start + end) / 2;
            build(data, 2 * node, start, mid);
            build(data, 2 * node + 1, mid + 1, end);
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        }
    }

    CarProperty query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return {FLT_MAX, FLT_MIN, 0}; // Out of range
        if (l <= start && end <= r) return tree[node]; // Total overlap
        int mid = (start + end) / 2;
        return query(2 * node, start, mid, l, r) +
               query(2 * node + 1, mid + 1, end, l, r); // Partial overlap
    }

public:
    SegmentTree(const vector<CarProperty>& data) {
        n = data.size();
        tree.resize(4 * n);
        build(data, 1, 0, n - 1);
    }

    CarProperty getStats(int l, int r) {
        return query(1, 0, n - 1, l, r);
    }
};

int main() {
    // Sample car variants with price ranges
    vector<CarProperty> variants = {
        {30000, 35000, 1}, // Variant 1
        {28000, 32000, 1}, // Variant 2
        {35000, 40000, 1}, // Variant 3
        {25000, 30000, 1}, // Variant 4
        {40000, 45000, 1}, // Variant 5
        {32000, 38000, 1}  // Variant 6
    };

    SegmentTree st(variants);

    // User selects price filter: $30,000-$35,000
    float userMin = 30000, userMax = 35000;

    // Query full range for demo purposes
    CarProperty stats = st.getStats(0, variants.size() - 1);

    cout << "Inventory statistics:\n";
    cout << "Total variants: " << stats.count << "\n";
    cout << "Price range: $" << stats.minPrice << " - $" << stats.maxPrice << "\n";

    // Show variants overlapping with the selected price range
    cout << "\nMatching variants in price range $" << userMin << " - $" << userMax << ":\n";
    for (int i = 0; i < variants.size(); ++i) {
        if (!(variants[i].maxPrice < userMin || variants[i].minPrice > userMax)) {
            cout << "Variant " << (i + 1) << ": $"
                 << variants[i].minPrice << " - $" << variants[i].maxPrice << "\n";
        }
    }

    return 0;
}
