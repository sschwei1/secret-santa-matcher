# Secret Santa Matcher
At work we wanted to play secret santa and needed a way to match all players. Well, this is how this project was created. We were 4 developers, each one taking onto this simple but somewhat tricky problem alone.

## Thought Process
The problem: Given a list of `n` participants, assign a match to each user where noone is matched with themself.
### Solution 1
My first though was, what if I take the first user of the list and remove it, and match it with a random user who is left. The matched user will then also be removed from the list and matched with another user left. This is repeated until only 1 user is left in the list. The last matched user will then be assigned the only left user in the list as match, while the user left in the list is matched with the initially first picked user.

```
list = ["A", "B", "C", "D"]
pick first user

list = ["B", "C", "D"]
"A" random match ...
"A" -> "C"

list = ["B", "D"]
"C" random match ...
"C" -> "B"

list = ["D"]
"B" -> "D"
"D" -> "A"
```

### Problems with Solution 1
Even tho the first solution is already working great and is not in danger of needing to be bruteforced, it still got some flaws. In the real world it would be possible to have loops. A loop is, that person `A` gifts to persn `B` and `B` to `A` (this loop can also consist of more than 2 people), however with the current solution it is only possible to have a chain of all participants and no smaller loops
```
last solution was:
"A" -> "C"
"C" -> "B"
"B" -> "D"
"D" -> "A"

this is currently not possible, even tho it would be a valid result:
"A" -> "B"
"B" -> "A"
"C" -> "D"
"D" -> "C"
```

### Solution 2
The idea was basically, if we are currently at atleast the 2nd person AND we have more than 1 person left in the list, there is a pseudo `loop` participant in the list. If this element is picked, the current user will be matched with the user starting the current loop. Afterwards the first user in the list will be picked and the process will restart. Also the last user left in the list will not be matched with the initial user at the start but the first user picked in the current loop.

```
list = ["A", "B", "C", "D"]
pick first user "A"

list = ["B", "C", "D"] // loop not possible, since "A" is the first user of the loop
"A" random match ...
"A" -> "C"

list = ["B", "D", "loop"] // loop possible
"C" random match ...
"C" -> loop -> "A"

pick first user "B"

list = ["D"]
"B" -> "D"
"D" -> "A"
```
