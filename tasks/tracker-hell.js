function trackerHell(backup) {
  const tasks = [];
  const users = [];

  let tasksString = "## Tasks";
  let usersString = "## Users";

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

  if (backup.type === "task") {
    findAllTasks(backup);
  } else {
    findAllUsers(backup);
  }

  tasks.sort((a, b) => (a.title > b.title ? 1 : -1)).forEach(task => {
    tasksString += `\n- ${task.title}`;

    if (task.assignee) {
      tasksString += `, do ${task.assignee.login}`;
    }
    if (task.spectators.length > 0) {
      tasksString += ", checking";
      task.spectators.forEach(user => {
        tasksString += ` ${user.login}`;
      });
    }
    if (task.subtasks.length > 0) {
      task.subtasks.forEach(subtask => {
        tasksString += `\n  * ${subtask.title}`;
      });
    }
  });

  users.sort((a, b) => (a.login > b.login ? 1 : -1)).forEach(user => {
    usersString += `\n- ${user.login}`;

    if (user.tasks.length > 0) {
      user.tasks.forEach(task => {
        usersString += `\n  - ${task.title}`;
      });
    }
  });

  return `${tasksString}\n\n${usersString}`;
}
