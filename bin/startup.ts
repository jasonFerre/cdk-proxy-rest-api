#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'

import { buildEnvironment } from '../config/config-build'
import { BudgetApiStack } from '../applications/budget-microservice-infra/budget-api-stack'

const appSettings = buildEnvironment()
const app = new cdk.App()

new BudgetApiStack(app, 'BudgetApiStack', {
  AppSettings: appSettings,
  env: appSettings.env,
})
