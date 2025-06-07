// all_codes/2/bloom_filter.cpp
#include <iostream>
#include <bitset>
#include <vector>

using namespace std;

const int FILTER_SIZE = 1000;
const int NUM_HASHES = 3;

bitset<FILTER_SIZE> bloomFilter;

// Simple hash simulation (in real systems, use murmur or fnv)
int hash(string s, int seed) {
    int h = 0;
    for (char c : s) h = (h * seed + c) % FILTER_SIZE;
    return h;
}

bool mightContain(string eventId) {
    for (int i = 1; i <= NUM_HASHES; i++) {
        if (!bloomFilter[hash(eventId, i * 31)])
            return false;
    }
    return true;
}

void insert(string eventId) {
    for (int i = 1; i <= NUM_HASHES; i++) {
        bloomFilter[hash(eventId, i * 31)] = 1;
    }
}

int main() {
    vector<string> events = {"click_A", "click_B", "click_A", "click_C"};

    cout << "✅ Deduplicating using Bloom Filter:\n";
    for (string e : events) {
        if (mightContain(e)) {
            cout << "→ Duplicate ignored: " << e << endl;
        } else {
            insert(e);
            cout << "→ New event accepted: " << e << endl;
        }
    }

    return 0;
}
