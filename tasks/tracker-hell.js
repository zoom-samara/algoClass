function trackerHell(data) {
  if (!data) return "";

  const tasks = [];
  const users = [];

  let tasksString = "## Задачи\n";
  let usersString = "## Пользователи\n";

  const sortTasksByAlphabet = function(a, b) {
    return a.title > b.title ? 1 : -1;
  };
  const sortUsersByAlphabet = function(a, b) {
    return a.login > b.login ? 1 : -1;
  };

  const findAllTasks = function(task) {
    const found = tasks.find(t => {
      return t.title === task.title;
    });

    if (found) return;

    if (!task.parent) {
      tasks.push(task);
    } else {
      findAllTasks(task.parent);
    }

    if (task.spectators.length > 0) {
      task.spectators.forEach(findAllUsers);
    }
    if (!!task.assignee) {
      findAllUsers(task.assignee);
    }
  };

  const findAllUsers = function(user) {
    const found = users.find(u => {
      return u.login === user.login;
    });

    if (found) return;

    users.push(user);

    if (user.tasks.length > 0) {
      user.tasks.forEach(findAllTasks);
    }
    if (user.spectating.length > 0) {
      user.spectating.forEach(findAllTasks);
    }
  };

  const writingTasks = function(tasksList, indent) {
    tasksList.sort(sortTasksByAlphabet).forEach(task => {
      tasksString += `\n${indent}- ${task.title}`;

      if (task.assignee) {
        tasksString += `, делает ${task.assignee.login}`;
      }
      if (task.spectators.length > 0) {
        tasksString += ", наблюдают: ";
        task.spectators.sort(sortUsersByAlphabet).forEach((user, idx) => {
          tasksString += `${user.login}`;

          if (idx !== task.spectators.length - 1) {
            tasksString += ", ";
          }
        });
      }
      if (task.subtasks.length > 0) {
        writingTasks(task.subtasks, indent + "  ");
      }
    });
  };

  const writingUsers = function(usersList) {
    usersList.sort(sortUsersByAlphabet).forEach(user => {
      usersString += `\n- ${user.login}`;

      if (user.tasks.length > 0) {
        user.tasks.sort(sortTasksByAlphabet).forEach(task => {
          usersString += `\n  * ${task.title}`;
        });
      }
    });
  };

  if (data.type === "task") {
    findAllTasks(data);
  } else {
    findAllUsers(data);
  }

  writingTasks(tasks, "");
  writingUsers(users);

  return `${tasksString}\n\n${usersString}`;
}
