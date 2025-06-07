#include <iostream>
#include <vector>
#include <memory>
using namespace std;

struct BoundingBox {
    float min[3], max[3];

    BoundingBox(float minX, float minY, float minZ, float maxX, float maxY, float maxZ) {
        min[0] = minX; min[1] = minY; min[2] = minZ;
        max[0] = maxX; max[1] = maxY; max[2] = maxZ;
    }

    bool contains(float x, float y, float z) const {
        return x >= min[0] && x <= max[0] &&
               y >= min[1] && y <= max[1] &&
               z >= min[2] && z <= max[2];
    }

    bool containsBox(const BoundingBox& box) const {
        return contains(box.min[0], box.min[1], box.min[2]) &&
               contains(box.max[0], box.max[1], box.max[2]);
    }

    bool intersects(const BoundingBox& other) const {
        return !(other.max[0] < min[0] || other.min[0] > max[0] ||
                 other.max[1] < min[1] || other.min[1] > max[1] ||
                 other.max[2] < min[2] || other.min[2] > max[2]);
    }
};

class OctreeNode {
    BoundingBox bounds;
    vector<unique_ptr<OctreeNode>> children;
    vector<pair<int, BoundingBox>> meshData; // Store mesh index with its bounding box
    static constexpr int MAX_MESHES = 5;
    static constexpr float MIN_SIZE = 1.0f;

public:
    OctreeNode(const BoundingBox& b) : bounds(b) {}

    void insert(int meshIdx, const BoundingBox& meshBounds) {
        if (!children.empty()) {
            for (auto& child : children) {
                if (child->bounds.containsBox(meshBounds)) {
                    child->insert(meshIdx, meshBounds);
                    return;
                }
            }
            // If it doesn't fully fit into any child, store in current
            meshData.emplace_back(meshIdx, meshBounds);
            return;
        }

        meshData.emplace_back(meshIdx, meshBounds);

        float sizeX = bounds.max[0] - bounds.min[0];
        if (meshData.size() > MAX_MESHES && sizeX > MIN_SIZE) {
            split();
        }
    }

    void split() {
        float midX = (bounds.min[0] + bounds.max[0]) / 2;
        float midY = (bounds.min[1] + bounds.max[1]) / 2;
        float midZ = (bounds.min[2] + bounds.max[2]) / 2;

        float x0 = bounds.min[0], x1 = bounds.max[0];
        float y0 = bounds.min[1], y1 = bounds.max[1];
        float z0 = bounds.min[2], z1 = bounds.max[2];

        children.reserve(8);
        children.emplace_back(make_unique<OctreeNode>(BoundingBox(x0, y0, z0, midX, midY, midZ)));
        children.emplace_back(make_unique<OctreeNode>(BoundingBox(midX, y0, z0, x1, midY, midZ)));
        children.emplace_back(make_unique<OctreeNode>(BoundingBox(x0, midY, z0, midX, y1, midZ)));
        children.emplace_back(make_unique<OctreeNode>(BoundingBox(midX, midY, z0, x1, y1, midZ)));
        children.emplace_back(make_unique<OctreeNode>(BoundingBox(x0, y0, midZ, midX, midY, z1)));
        children.emplace_back(make_unique<OctreeNode>(BoundingBox(midX, y0, midZ, x1, midY, z1)));
        children.emplace_back(make_unique<OctreeNode>(BoundingBox(x0, midY, midZ, midX, y1, z1)));
        children.emplace_back(make_unique<OctreeNode>(BoundingBox(midX, midY, midZ, x1, y1, z1)));

        // Reinsert old meshes into new children
        vector<pair<int, BoundingBox>> oldMeshes = meshData;
        meshData.clear();
        for (const auto& [meshIdx, meshBounds] : oldMeshes) {
            insert(meshIdx, meshBounds);
        }
    }

    void queryVisibleMeshes(const BoundingBox& viewFrustum, vector<int>& outVisibleMeshes) const {
        if (!bounds.intersects(viewFrustum)) return;

        if (children.empty()) {
            for (const auto& [idx, box] : meshData) {
                if (viewFrustum.intersects(box)) {
                    outVisibleMeshes.push_back(idx);
                }
            }
        } else {
            for (const auto& child : children) {
                child->queryVisibleMeshes(viewFrustum, outVisibleMeshes);
            }
        }
    }
};

int main() {
    // Octree root node covering the whole 3D car model area
    OctreeNode root(BoundingBox(0, 0, 0, 10, 10, 10));

    // Insert car part meshes with simplified bounding boxes
    for (int i = 0; i < 20; i++) {
        float x = float(i % 5);
        float y = float(i % 3);
        BoundingBox partBox(x, y, 0, x + 1.0f, y + 1.0f, 1.0f);
        root.insert(i, partBox);
    }

    // Define a simplified camera frustum
    BoundingBox viewFrustum(2, 1, 0, 8, 9, 10);
    vector<int> visibleMeshes;
    root.queryVisibleMeshes(viewFrustum, visibleMeshes);

    cout << "Visible meshes in current view: ";
    for (int idx : visibleMeshes) cout << idx << " ";
    cout << endl;

    return 0;
}
