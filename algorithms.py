def gridTraveler(m, n, memo = {}):
    key = (m, n)
    if key in memo:
        return memo[key]
    if m == 1 and n == 1:
        return 1
    if m == 0 or n == 0:
        return 0
    memo[key] = gridTraveler(m - 1, n, memo) + gridTraveler(m, n - 1, memo)
    return memo[key]

print(gridTraveler(18,15))


def fib(n, memo={}):
    key = n
    if key in memo:
        return memo[key]
    if n <= 2:
        return 1
    memo[key] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]

print(fib(10))