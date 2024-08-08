
// You are a logistics coordinator for a busy e-commerce warehouse. Each day, you need to load a delivery truck with a specific capacity to ensure that all the packages are dispatched to customers within a given number of days.

// You have a list of package weights that need to be shipped, and you want to find out the minimum truck capacity required to deliver all the packages within the allotted number of days by effectively using the binary search algorithm.

// Example

// Input:

// 5

// 1 2 3 1 1

// 4

// Output:

// 3

// Explanation

// With package weights [1, 2, 3, 1, 1] and needing to ship within 4 days, you must find the minimum truck capacity that allows this. By testing capacities, you find that 3 is the smallest capacity that fits the packages into exactly 4 days:

// Day 1: Packages [1, 2] (Total: 3)

// Day 2: Package [3] (Total: 3)

// Day 3: Packages [1, 1] (Total: 2)

// Day 4: No packages left

// Thus, the minimum required capacity is 3.
// Input format :

// The first line of input consists of a single integer N, representing the number of packages to be shipped.

// The second line of input consists of N space-separated integers, denoting the weights of the packages.

// The third line of input consists of a single integer D, representing the number of days within which the packages should be shipped.
// Output format :

// The output prints the minimum truck capacity required so that all packages can be delivered within the given number of days.

// Refer to the sample output for the formatting specifications.
// Code constraints :

// The given test case will fall under the following constraints:

// 1 ≤ D ≤ N ≤ 10

// 1 ≤ each package's weight ≤ 100
// Sample test cases :
// Input 1 :

// 5
// 1 2 3 1 1
// 4

// Output 1 :

// 3

// Input 2 :

// 10
// 1 2 3 4 5 6 7 8 9 10
// 5

// Output 2 :

// 15

// Input 3 :

// 6
// 3 2 2 4 1 4
// 3

// Output 3 :

// 6

// Note :
// The program will be evaluated only after the “Submit Code” is clicked.
// Extra spaces and new line characters in the program output will result in the failure of the test case.

// You are using GCC
#include <stdio.h>

int main()
{
    int n = 6;
    // scanf("%d", &n);
    int arr[6] = {1, 3, 4, 5, 6, 8};
    // for (int i = 0; i < n; i++)
    // {
    //     scanf("%d", &arr[i]);
    // }
    int h;
    scanf("%d", &h);
    int largest = -9999;
    for (int i = 0; i < n; i++)
    {
        if (arr[i] > largest)
        {
            largest = arr[i];
        }
    }
    printf("largest %d\n", largest);
    for (int i = 0; i < largest; i++)
    {
        int hours = 0;
        printf("horas is %d %d\n", i, h);
        for (int j = 0; j < n; j++)
        {
            hours += (arr[j] / i) + 1;
            printf("j is %d", j);
        }
        if (hours == h)
        {
            printf("fuck you%d", i);
            break;
        }
    }
    printf("fgjk");
}