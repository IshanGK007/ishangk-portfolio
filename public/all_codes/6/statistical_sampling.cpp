#include <iostream>
#include <vector>
#include <random>
#include <algorithm>

// Problem: Traditional A/B testing requires large user pools, causing delays
// Solution: Statistical sampling allows reliable decisions with smaller, representative samples

class ABSampler {
public:
    ABSampler(const std::vector<int>& population) : population(population) {}
    
    // Stratified sampling to ensure representative subsets
    std::vector<int> get_sample(int sample_size) {
        std::vector<int> sample;
        std::sample(population.begin(), population.end(), std::back_inserter(sample),
                   sample_size, std::mt19937{std::random_device{}()});
        return sample;
    }
    
    // Early termination if variant shows significant difference
    bool should_terminate_early(const std::vector<int>& variantA, 
                               const std::vector<int>& variantB, 
                               double threshold) {
        double meanA = calculate_mean(variantA);
        double meanB = calculate_mean(variantB);
        return std::abs(meanA - meanB) > threshold;
    }

private:
    double calculate_mean(const std::vector<int>& data) {
        return std::accumulate(data.begin(), data.end(), 0.0) / data.size();
    }
    
    std::vector<int> population;
};

int main() {
    // Simulate user engagement data (e.g., time spent) for two content variants
    std::vector<int> allUsers(10000);
    std::generate(allUsers.begin(), allUsers.end(), [](){ return rand() % 100; });
    
    ABSampler sampler(allUsers);
    auto sampleA = sampler.get_sample(500); // Small representative sample
    auto sampleB = sampler.get_sample(500);
    
    // Can make early decisions without waiting for full population
    if (sampler.should_terminate_early(sampleA, sampleB, 10.0)) {
        std::cout << "Significant difference detected - early termination possible\n";
    }
    
    return 0;
}