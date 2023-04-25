const main = async () => {
  const contractFactory = await ethers.getContractFactory("Todo");
  const contract = await contractFactory.deploy();
  console.log(`Address: ${contract.address}`);

  await contract.addTask("Pilot Task");
  await contract.addTask("Good Morning");
  await contract.addTask("Good Afternoon");
  await contract.addTask("Good Night");

  await contract.deleteTask(3);
  await contract.markCompleted(1);

  const { id, title, isCompleted } = await contract.getById(2);
  console.log("Added Task: ", { id, title, isCompleted });

  const allTasks = await contract.getAllTasks();
  console.log(`All Tasks:`);
  for (const task of allTasks) {
    const { id, title, isCompleted } = task;
    console.log({ id, title, isCompleted });
  }
};

main();
