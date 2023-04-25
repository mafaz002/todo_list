// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Todo {
    struct Task {
        int id;
        string title;
        bool isCompleted;
    }

    Task[] public todoList;
    mapping(int => int) public idIndexLookup;

    function addTask(string memory _title) public {
        int count = int256(todoList.length);
        Task memory _task = Task(count + 1, _title, false);
        todoList.push(_task);
        idIndexLookup[count + 1] = count;
    }

    function markCompleted(int _id) public {
        int index = idIndexLookup[_id];
        todoList[uint256(index)].isCompleted = true;
    }

    function deleteTask(int _id) public {
        int index = idIndexLookup[_id];

        for (int i = index; i < int256(todoList.length) - 1; i++) {
            todoList[uint256(i)] = todoList[uint256(i + 1)];
        }

        todoList.pop();
    }

    function getById(int _id) public view returns (Task memory) {
        int index = idIndexLookup[_id];
        return todoList[uint256(index)];
    }

    function getAllTasks() public view returns (Task[] memory) {
        return todoList;
    }
}
