import {
  fetchTaskById,
  fetchTasks,
  getTasksByCategory,
  getTasksByUsername,
  insertTask,
  modifyTask,
  removeTask,
} from "../../../src/utils/task";
import tasks from "../../../src/db/taskData";
import taskFakeData from "../../shared/constant/fakeTasks";

describe("insertTask", () => {
  test("should return error if no task data is passed for creating a task.", () => {
    const response = insertTask(taskFakeData);

    expect(response).toBe(true);
    expect(tasks.length).toBe(1);
  });
});

describe("fetchTasks", () => {
  beforeEach(() => {
    tasks.length = 0;
  });

  test("should return all tasks", () => {
    const id = 1;

    taskFakeData.id = id;
    tasks.push(taskFakeData);
    const response = fetchTasks();

    expect(response[0]).toEqual(taskFakeData);
    expect(response.length).toBe(1);
  });

  test("should return empty array if no task found", () => {
    const response = fetchTasks();

    expect(response).toEqual([]);
    expect(response.length).toBe(0);
  });
});

describe("fetchTaskById", () => {
  afterEach(() => {
    tasks.length = 0;
  });

  test("should return task if correct id is passed.", () => {
    const id = 1;

    taskFakeData.id = id;
    tasks.push(taskFakeData);

    expect(fetchTaskById(id)).toEqual([taskFakeData]);
    expect(tasks.length).toBe(1);
  });

  test("should return empty array if incorrect id is passed", () => {
    const id = 99;

    expect(fetchTaskById(id)).toEqual([]);
    expect(tasks.length).toBe(0);
  });
});

describe("removeTask", () => {
  beforeEach(() => {
    taskFakeData.id = 1;
    tasks.push(taskFakeData);
  });

  afterEach(() => {
    tasks.length = 0;
  });
  test("should delete task successfully if correct id is passed", () => {
    const id = 1;
    const response = removeTask(id);

    expect(response).toEqual(true);
    expect(tasks.length).toBe(0);
  });

  test("should not delete any task if incorrect id is passed.", () => {
    const id = 10;
    const response = removeTask(id);

    expect(response).toEqual(false);
    expect(tasks.length).toBe(1);
  });
});

describe("getTasksByUsername", () => {
  beforeEach(() => {
    taskFakeData.id = 1;
    tasks.push(taskFakeData);
  });

  afterEach(() => {
    tasks.length = 0;
  });
  test("should return tasks which are assigned to the username passed", () => {
    const assigned_To = "mchi";
    const response = getTasksByUsername(assigned_To);

    expect(response).toEqual([]);
  });

  test("should return empty array if there are no tasks assigned to the username passed.", () => {
    const assigned_To = "Usama";
    const response = getTasksByUsername(assigned_To);

    expect(response[0]).toEqual(taskFakeData);
  });
});

describe("getTasksByCategory", () => {
  beforeEach(() => {
    taskFakeData.id = 1;
    tasks.push(taskFakeData);
  });

  afterEach(() => {
    tasks.length = 0;
  });
  test("should return task whose category matched with the category passed.", () => {
    const category = "UI";
    const response = getTasksByCategory(category);

    expect(response).toEqual([]);
  });

  test("should return empty array if no task is found of the category passed.", () => {
    const assigned_To = "DevOps";
    const response = getTasksByCategory(assigned_To);

    expect(response[0]).toEqual(taskFakeData);
  });
});

describe("modifyTask", () => {
  beforeEach(() => {
    taskFakeData.id = 1;
    tasks.push(taskFakeData);
  });

  afterEach(() => {
    tasks.length = 0;
  });
  test("should update task successfully", () => {
    const id = 1;

    const updatedTaskData = {
      title: "CI/CD",
      description: "Develop and deploy properly oriented CI/CD pipeline.",
      creation_date: "03/03/2022",
      due_date: "04/05/2022",
      assigned_to: "Mchi",
      category: "DevOps",
      status: "fulfill",
    };

    const response = modifyTask(id, updatedTaskData);

    expect(response).toBe(true);
    expect(tasks.length).toBe(1);
  });

  test("should return false if incorrect id is passed", () => {
    const id = 2;

    const updatedTaskData = {
      title: "CI/CD Pipeline",
      description: "Develop and deploy properly oriented CI/CD pipeline.",
      creation_date: "03/03/2022",
      due_date: "04/05/2022",
      assigned_to: "Jousha",
      category: "DevOps",
      status: "Pending",
    };

    const response = modifyTask(id, updatedTaskData);

    expect(response).toBe(false);
    expect(tasks.length).toBe(1);
  });
});
