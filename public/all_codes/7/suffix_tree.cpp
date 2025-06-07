#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

class SuffixTreeNode {
public:
    unordered_map<char, SuffixTreeNode*> children;
    vector<int> indexes; // Stores indexes of suffixes

    void insertSuffix(const string& s, int index) {
        indexes.push_back(index);
        if (!s.empty()) {
            char firstChar = s[0];
            if (children.find(firstChar) == children.end()) {
                children[firstChar] = new SuffixTreeNode();
            }
            children[firstChar]->insertSuffix(s.substr(1), index);
        }
    }

    vector<int> search(const string& pattern) {
        if (pattern.empty()) return indexes;
        char firstChar = pattern[0];
        if (children.find(firstChar) != children.end()) {
            return children[firstChar]->search(pattern.substr(1));
        }
        return {};
    }
};

class SuffixTree {
    SuffixTreeNode root;
public:
    SuffixTree(const string& text) {
        for (int i = 0; i < text.size(); i++) {
            root.insertSuffix(text.substr(i), i);
        }
    }

    vector<int> searchPattern(const string& pattern) {
        return root.search(pattern);
    }
};

int main() {
    // Example: Video metadata containing regional tags
    string videoMetadata = "us_ad_campaign,fr_movie_trailer,es_tv_show,jp_ad_campaign,us_movie";
    
    SuffixTree st(videoMetadata);
    
    // Search for all content for US market
    vector<int> usResults = st.searchPattern("us_");
    cout << "US content found at positions: ";
    for (int pos : usResults) cout << pos << " ";
    cout << endl;
    
    // Search for all ad campaigns
    vector<int> adResults = st.searchPattern("_ad_");
    cout << "Ad campaigns found at positions: ";
    for (int pos : adResults) cout << pos << " ";
    cout << endl;
    
    return 0;
}