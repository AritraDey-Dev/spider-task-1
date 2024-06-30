#include <iostream>
#include <vector>

using namespace std;

namespace DeadlockDetection {
    
    // Function to check if a process can be allocated the required resources
    bool canAllocate(const vector<int>& available, const vector<int>& need) {
        for (int i = 0; i < available.size(); ++i) {
            if (need[i] > available[i]) {
                return false;
            }
        }
        return true;
    }

    // Function to check if the system is in a safe state
    bool isSafeState(const vector<vector<int>>& max, const vector<vector<int>>& allocation, const vector<int>& available) {
        int num_processes = max.size();
        int num_resources = available.size();

        vector<int> work = available;
        vector<bool> finish(num_processes, false);

        vector<int> safe_sequence;

        while (safe_sequence.size() < num_processes) {
            bool found = false;
            for (int i = 0; i < num_processes; ++i) {
                if (!finish[i] && canAllocate(work, max[i])) {
                    for (int j = 0; j < num_resources; ++j) {
                        work[j] += allocation[i][j];
                    }
                    safe_sequence.push_back(i);
                    finish[i] = true;
                    found = true;
                }
            }
            if (!found) {
                break;
            }
        }

        if (safe_sequence.size() == num_processes) {
            cout << "System is in a safe state. Safe sequence: ";
            for (int i : safe_sequence) {
                cout << i << " ";
            }
            cout << endl;
            return true;
        } else {
            cout << "System is not in a safe state." << endl;
            return false;
        }
    }

    // Function to print the matrix
    void printMatrix(const vector<vector<int>>& matrix) {
        for (const auto& row : matrix) {
            for (int val : row) {
                cout << val << " ";
            }
            cout << endl;
        }
    }
}

int main() {
    using namespace DeadlockDetection;

    int num_processes, num_resources;

    cout << "Enter the number of processes: ";
    cin >> num_processes;
    cout << "Enter the number of resources: ";
    cin >> num_resources;

    vector<vector<int>> max(num_processes, vector<int>(num_resources));
    vector<vector<int>> allocation(num_processes, vector<int>(num_resources));
    vector<int> available(num_resources);

    cout << "Enter the maximum resource matrix: " << endl;
    for (int i = 0; i < num_processes; ++i) {
        for (int j = 0; j < num_resources; ++j) {
            cin >> max[i][j];
        }
    }

    cout << "Enter the allocation matrix: " << endl;
    for (int i = 0; i < num_processes; ++i) {
        for (int j = 0; j < num_resources; ++j) {
            cin >> allocation[i][j];
        }
    }

    cout << "Enter the available resources: " << endl;
    for (int i = 0; i < num_resources; ++i) {
        cin >> available[i];
    }

    cout << "Maximum Resource Matrix:" << endl;
    printMatrix(max);
    cout << "Allocation Matrix:" << endl;
    printMatrix(allocation);
    cout << "Available Resources:" << endl;
    for (int i = 0; i < num_resources; ++i) {
        cout << available[i] << " ";
    }
    cout << endl;

    isSafeState(max, allocation, available);

    return 0;
}

