#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

struct CarVariant {
    float color[3]; // RGB
    float wheelSize;
    int accessories;
    
    float distance(const CarVariant& other) const {
        float colorDist = sqrt(pow(color[0]-other.color[0], 2) + 
                          pow(color[1]-other.color[1], 2) + 
                          pow(color[2]-other.color[2], 2);
        float wheelDist = abs(wheelSize - other.wheelSize);
        float accDist = abs(accessories - other.accessories);
        return colorDist + wheelDist + accDist;
    }
};

class KDNode {
    CarVariant variant;
    unique_ptr<KDNode> left, right;
    int axis; // Splitting axis (0=colorR, 1=colorG, etc.)
    
public:
    KDNode(const CarVariant& v, int a) : variant(v), axis(a) {}
    
    void insert(const CarVariant& newVariant) {
        int nextAxis = (axis + 1) % 5; // Cycle through all dimensions
        
        float newVal = getAxisValue(newVariant, axis);
        float nodeVal = getAxisValue(variant, axis);
        
        if (newVal < nodeVal) {
            if (!left) left = make_unique<KDNode>(newVariant, nextAxis);
            else left->insert(newVariant);
        } else {
            if (!right) right = make_unique<KDNode>(newVariant, nextAxis);
            else right->insert(newVariant);
        }
    }
    
    void findNearest(const CarVariant& query, CarVariant& best, float& bestDist) const {
        float dist = variant.distance(query);
        if (dist < bestDist) {
            bestDist = dist;
            best = variant;
        }
        
        float queryVal = getAxisValue(query, axis);
        float nodeVal = getAxisValue(variant, axis);
        
        // Search the likely branch first
        unique_ptr<KDNode> first = queryVal < nodeVal ? move(left) : move(right);
        unique_ptr<KDNode> second = queryVal < nodeVal ? move(right) : move(left);
        
        if (first) first->findNearest(query, best, bestDist);
        
        // Check if we need to search the other branch
        if (second && abs(queryVal - nodeVal) < bestDist) {
            second->findNearest(query, best, bestDist);
        }
    }
    
private:
    float getAxisValue(const CarVariant& v, int a) const {
        if (a == 0) return v.color[0];
        if (a == 1) return v.color[1];
        if (a == 2) return v.color[2];
        if (a == 3) return v.wheelSize;
        return v.accessories;
    }
};

class KDTree {
    unique_ptr<KDNode> root;
    
public:
    void insert(const CarVariant& variant) {
        if (!root) {
            root = make_unique<KDNode>(variant, 0);
        } else {
            root->insert(variant);
        }
    }
    
    CarVariant findNearestVariant(const CarVariant& query) {
        if (!root) return query; // Edge case
        
        CarVariant best = root->variant;
        float bestDist = query.distance(best);
        root->findNearest(query, best, bestDist);
        return best;
    }
};

int main() {
    KDTree variantTree;
    
    // Generate some random car variants
    for (int i = 0; i < 100; i++) {
        CarVariant v;
        v.color[0] = rand() % 100 / 100.0f;
        v.color[1] = rand() % 100 / 100.0f;
        v.color[2] = rand() % 100 / 100.0f;
        v.wheelSize = 17 + rand() % 5;
        v.accessories = rand() % 8;
        variantTree.insert(v);
    }
    
    // User creates a new variant
    CarVariant userVariant;
    userVariant.color[0] = 0.8f; userVariant.color[1] = 0.1f; userVariant.color[2] = 0.1f;
    userVariant.wheelSize = 19;
    userVariant.accessories = 3;
    
    // Find most similar existing variant
    CarVariant nearest = variantTree.findNearestVariant(userVariant);
    
    cout << "Most similar existing variant:\n";
    cout << "Color: (" << nearest.color[0] << ", " << nearest.color[1] << ", " << nearest.color[2] << ")\n";
    cout << "Wheel size: " << nearest.wheelSize << "\n";
    cout << "Accessories: " << nearest.accessories << endl;
    
    return 0;
}