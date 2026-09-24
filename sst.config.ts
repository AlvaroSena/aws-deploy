/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "aws-deploy",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("MyVpc");
    const cluster = new sst.aws.Cluster("MyCluster", { vpc });

    new sst.aws.Service("API", {
      cluster,
      memory: "0.5 GB",
      cpu: "0.25 vCPU",
      scaling: {
        min: 1,
        max: 2,
        cpuUtilization: 50,
        memoryUtilization: 80,
      },
      capacity: {},
      loadBalancer: {
        rules: [{ listen: "80/http", forward: "3333/http" }],
      },
      dev: {
        command: "npm run start",
      },
    });
  },
});
