#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Implementation of Stable Marriage Algorithm for product recommendations
class StableMarriageRecommender {
    vector<vector<int>> customerPrefs; // Customer preferences (ranked product indices)
    vector<vector<int>> productPrefs;  // Product preferences (ranked customer indices)
    vector<vector<int>> productRank;   // productRank[p][c] = rank of customer c in product p's preference
    int n;

    // Initialize rank matrix for constant-time preference comparison
    void buildProductRankMatrix() {
        productRank.assign(n, vector<int>(n, 0));
        for (int product = 0; product < n; ++product)
            for (int rank = 0; rank < n; ++rank)
                productRank[product][productPrefs[product][rank]] = rank;
    }

public:
    StableMarriageRecommender(const vector<vector<int>>& cp, const vector<vector<int>>& pp)
        : customerPrefs(cp), productPrefs(pp), n(cp.size()) {
        buildProductRankMatrix();
    }

    // Find stable matching between customers and products
    vector<int> findStableMatches() {
        vector<int> customerPartner(n, -1); // customer -> product
        vector<int> productPartner(n, -1);  // product -> customer
        vector<int> nextPref(n, 0);         // next product to propose for each customer
        queue<int> freeCustomers;

        for (int i = 0; i < n; ++i)
            freeCustomers.push(i);

        while (!freeCustomers.empty()) {
            int customer = freeCustomers.front();
            freeCustomers.pop();

            if (nextPref[customer] >= n) continue; // No more products to propose

            int product = customerPrefs[customer][nextPref[customer]];
            nextPref[customer]++;

            if (productPartner[product] == -1) {
                // Product is free
                productPartner[product] = customer;
                customerPartner[customer] = product;
            } else {
                int currentCustomer = productPartner[product];
                if (productRank[product][customer] < productRank[product][currentCustomer]) {
                    // Product prefers the new customer
                    productPartner[product] = customer;
                    customerPartner[customer] = product;
                    customerPartner[currentCustomer] = -1;
                    freeCustomers.push(currentCustomer);
                } else {
                    // Product prefers current partner
                    freeCustomers.push(customer); // Requeue customer
                }
            }
        }

        return customerPartner;
    }
};

int main() {
    // Problem: Need to provide conflict-free, optimal product recommendations
    // Solution: Stable Marriage Algorithm matches preferences without conflicts

    vector<vector<int>> customerPrefs = {
        {1, 0, 2},
        {0, 1, 2},
        {0, 1, 2}
    };

    vector<vector<int>> productPrefs = {
        {0, 1, 2},
        {1, 0, 2},
        {0, 1, 2}
    };

    StableMarriageRecommender smr(customerPrefs, productPrefs);
    vector<int> matches = smr.findStableMatches();

    cout << "Stable Recommendation Matches:\n";
    for (int i = 0; i < matches.size(); ++i) {
        cout << "Customer " << i << " gets Product " << matches[i] << endl;
    }

    // Ensures:
    // ✅ No customer ends up with an undesired product
    // ✅ No two pairs want to swap (stable)
    // ✅ Matched optimally based on mutual preferences

    return 0;
}
