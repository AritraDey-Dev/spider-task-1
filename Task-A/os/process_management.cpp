
i#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

namespace ProcessScheduling {

    struct Process {
        int pid;            // Process ID
        int burst_time;     // Burst time of the process
        int arrival_time;   // Arrival time of the process
        int waiting_time;   // Waiting time of the process
        int turnaround_time;// Turnaround time of the process
    };

    // Function to perform FIFO Scheduling
    void fifoScheduling(vector<Process>& processes) {
        int n = processes.size();
        int current_time = 0;
        int total_waiting_time = 0;
        int total_turnaround_time = 0;

        // Sort processes based on their arrival time
        sort(processes.begin(), processes.end(), [](const Process &a, const Process &b) {
            return a.arrival_time < b.arrival_time;
        });

        for (int i = 0; i < n; ++i) {
            if (current_time < processes[i].arrival_time) {
                current_time = processes[i].arrival_time;
            }
            processes[i].waiting_time = current_time - processes[i].arrival_time;
            processes[i].turnaround_time = processes[i].waiting_time + processes[i].burst_time;
            current_time += processes[i].burst_time;

            total_waiting_time += processes[i].waiting_time;
            total_turnaround_time += processes[i].turnaround_time;
        }

        cout << "Process ID\tArrival Time\tBurst Time\tWaiting Time\tTurnaround Time\n";
        for (const auto& process : processes) {
            cout << process.pid << "\t\t" << process.arrival_time << "\t\t" << process.burst_time 
                 << "\t\t" << process.waiting_time << "\t\t" << process.turnaround_time << "\n";
        }

        cout << "\nAverage Waiting Time: " << (float)total_waiting_time / n << endl;
        cout << "Average Turnaround Time: " << (float)total_turnaround_time / n << endl;
    }
}

int main() {
    using namespace ProcessScheduling;

    vector<Process> processes = {
        {1, 6, 0, 0, 0},
        {2, 8, 1, 0, 0},
        {3, 7, 2, 0, 0},
        {4, 3, 3, 0, 0}
    };

    fifoScheduling(processes);

    return 0;
}

