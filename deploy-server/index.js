const { helmInstall } = require("./utils/helmClient");
const { createNamespace } = require("./utils/k8sService");
require("dotenv").config();

const startProcess = async () => {
  console.log("Starting process...");
  const namespace = process.env.NAMESPACE;
  const appName = process.env.APP_NAME;
  const chart = process.env.CHART;
  const deploymentId = process.env.DEPLOYMENT_ID;
  const helmRepo = process.env.HELM_REPO;

  try {
    await createNamespace(namespace);
    await helmInstall(helmRepo, appName, namespace, chart);
  } catch (error) {
    console.log("Deployment error:", error);
    // await fetch("http://localhost:5000/deploy/error", {
    //   method: "POST",

    //   body: JSON.stringify({
    //     deploymentId,
    //   }),
    // });
  }

  // Keep the process running
  // setInterval(() => {
  //   console.log("Process is running...");
  // }, 60000); // log every minute

  process.exit(0);
};

startProcess();
