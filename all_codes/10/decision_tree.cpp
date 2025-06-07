#include <iostream>
#include <string>
#include <vector>
#include <map>
using namespace std;

// Decision Tree Node
class DTNode {
public:
    string question; // or feature to split on
    map<string, DTNode*> children; // answers/values to child nodes
    string intent; // only for leaf nodes
    
    DTNode(string q) : question(q), intent("") {}
    DTNode(string i, bool is_leaf) : question(""), intent(i) {}
};

// Simple Decision Tree for customer intent recognition
class IntentDecisionTree {
    DTNode* root;
    
    // Helper function to traverse tree
    string traverse(DTNode* node, const map<string, string>& features) {
        if (node->question.empty()) return node->intent;
        
        string feature_value = features.at(node->question);
        if (node->children.count(feature_value)) {
            return traverse(node->children[feature_value], features);
        }
        return "unknown_intent";
    }

public:
    IntentDecisionTree() {
        // Build a simple decision tree (in practice, this would be trained)
        root = new DTNode("product_type");
        
        // Clothing branch
        DTNode* clothing = new DTNode("color_preference");
        root->children["clothing"] = clothing;
        
        // Shoes branch
        DTNode* shoes = new DTNode("size_inquiry");
        root->children["shoes"] = shoes;
        
        // Leaf nodes
        clothing->children["red"] = new DTNode("red_clothing_interest", true);
        clothing->children["blue"] = new DTNode("blue_clothing_interest", true);
        
        shoes->children["yes"] = new DTNode("shoe_size_question", true);
        shoes->children["no"] = new DTNode("general_shoe_interest", true);
    }
    
    // Predict intent based on customer input features
    string predictIntent(const map<string, string>& features) {
        return traverse(root, features);
    }
};

int main() {
    // Problem: Need to accurately interpret diverse customer intents
    // Solution: Decision Tree classifies intents based on input features
    
    IntentDecisionTree dt;
    
    // Example customer interactions
    map<string, string> interaction1 = {
        {"product_type", "clothing"},
        {"color_preference", "red"}
    };
    
    map<string, string> interaction2 = {
        {"product_type", "shoes"},
        {"size_inquiry", "yes"}
    };
    
    cout << "Interaction 1 intent: " << dt.predictIntent(interaction1) << endl;
    cout << "Interaction 2 intent: " << dt.predictIntent(interaction2) << endl;
    
    // This demonstrates how decision trees can classify customer intents
    // based on their input features, enabling natural, context-aware conversations
    
    return 0;
}