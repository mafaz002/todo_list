// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    struct Task {
        int id;
        string title;
        bool isCompleted;
    };

    Task[] public todoList;
    mapping(int => int) public idIndexLookup;

    function addTask(string memory _title) public {
        int count = todoList.length;
        Task _task = Task(count + 1, _title, false);
        todoList.push(_task);
        idIndexLookup[count + 1] = count;
    }

    function markCompleted(int _id) public {
        int index = idIndexLookup[_id];
        todoList[index].isCompleted = true;
    }

    function deleteTask(int _id) public {
        int index = idIndexLookup[_id];

        for(int i=index; i<todoList.length-1; i++){
            todoList[i] = todoList[i+1];
        }

        todoList.pop();
    }

    function getAllTasks() public view returns(Task[]){
        return todoList;
    }
}
