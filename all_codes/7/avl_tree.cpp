#include <iostream>
#include <algorithm>
using namespace std;

class AVLNode {
public:
    int priority; // Lower value = higher priority
    string taskId;
    AVLNode *left, *right;
    int height;

    AVLNode(int p, string id) : priority(p), taskId(id), left(nullptr), right(nullptr), height(1) {}
};

class AVLTree {
    AVLNode* root;

    int height(AVLNode* node) {
        return node ? node->height : 0;
    }

    int balanceFactor(AVLNode* node) {
        return node ? height(node->left) - height(node->right) : 0;
    }

    AVLNode* rightRotate(AVLNode* y) {
        AVLNode* x = y->left;
        AVLNode* T2 = x->right;

        x->right = y;
        y->left = T2;

        y->height = max(height(y->left), height(y->right)) + 1;
        x->height = max(height(x->left), height(x->right)) + 1;

        return x;
    }

    AVLNode* leftRotate(AVLNode* x) {
        AVLNode* y = x->right;
        AVLNode* T2 = y->left;

        y->left = x;
        x->right = T2;

        x->height = max(height(x->left), height(x->right)) + 1;
        y->height = max(height(y->left), height(y->right)) + 1;

        return y;
    }

    AVLNode* insert(AVLNode* node, int priority, string taskId) {
        if (!node) return new AVLNode(priority, taskId);

        if (priority < node->priority)
            node->left = insert(node->left, priority, taskId);
        else if (priority > node->priority)
            node->right = insert(node->right, priority, taskId);
        else
            return node; // Equal priorities not allowed

        node->height = 1 + max(height(node->left), height(node->right));

        int balance = balanceFactor(node);

        // Left Left Case
        if (balance > 1 && priority < node->left->priority)
            return rightRotate(node);

        // Right Right Case
        if (balance < -1 && priority > node->right->priority)
            return leftRotate(node);

        // Left Right Case
        if (balance > 1 && priority > node->left->priority) {
            node->left = leftRotate(node->left);
            return rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && priority < node->right->priority) {
            node->right = rightRotate(node->right);
            return leftRotate(node);
        }

        return node;
    }

    AVLNode* minValueNode(AVLNode* node) {
        AVLNode* current = node;
        while (current->left)
            current = current->left;
        return current;
    }

public:
    AVLTree() : root(nullptr) {}

    void addTask(int priority, string taskId) {
        root = insert(root, priority, taskId);
    }

    string getHighestPriorityTask() {
        if (!root) return "No tasks";
        AVLNode* minNode = minValueNode(root);
        return minNode->taskId + " (Priority: " + to_string(minNode->priority) + ")";
    }
};

int main() {
    AVLTree taskQueue;
    
    // Adding localization tasks with priorities
    // Lower priority number = higher urgency
    taskQueue.addTask(3, "Localize ad campaign for Germany");
    taskQueue.addTask(1, "URGENT: Fix lip-sync for Japanese dub");
    taskQueue.addTask(2, "Update Spanish subtitles for movie");
    taskQueue.addTask(5, "Standard localization for French market");
    
    // Getting the highest priority task (lowest number)
    cout << "Next task to process: " << taskQueue.getHighestPriorityTask() << endl;
    
    return 0;
}