# Service Map Descriptions

This document provides a map for the Creative Studio microservice to the following AWS services: S3 and DynamoDB. The data in the tables below has been extracted from the persistent bucket and the DynamoDB tables listed below. The `${environment}` is dependent on the environment you are accessing, which can be either 'dev', 'test', or 'prd'.

## Bucket:

- `wpp-ai-base-${environment}-wpp-ai-base-prd-persistentdatabucket`

## DynamoDB Tables:

Each of the following DynamoDB tables corresponds to a specific `${environment}` (dev, test, prd):

- `agentconfig-${environment}-AgentConfig`
- `budget-${environment}-Budget`
- `dataset-${environment}-Dataset`
- `dataset-${environment}-DatasetVersion`
- `globalpass-${environment}-Passes`
- `label-${environment}-Label`
- `project-${environment}-Project`
- `relation-${environment}-Relation-Generic`
- `resource-${environment}-Resources`
- `toolresult-${environment}-ToolResult`
- `training-${environment}-TrainingModel`
- `training-${environment}-TrainingModelVersion`

Please replace `${environment}` with your target environment when accessing these resources.

### S3 Microservice MAP

| Service         | Segregated By    | Key Pattern                                                                                                                                     | Example                                                                                                                                                                        |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **AgentConfig** | none             | `agents/${agentConfig.`<br>`agentConfigId}.json`                                                                                                | `agents/DENaqIRqO9kdDbThWIuRR.json`                                                                                                                                            |
| **FFmpeg**      | none             | `ffmpeg/${ffmpegId}.json`                                                                                                                       | `ffmpeg/0032eb87-5855-4a1e-`<br>`a12a-5fb508e626a7.jpeg`                                                                                                                       |
| **GlobalUsage** | none             | `globalusage/success/`<br>`year=${year}/month=`<br>`${month}/day=${day}/hour=`<br>`${hour}/prd-prd-globalusage-`<br>`prd-1-${timestamp}-${key}` | `globalusage/success/`<br>`year=2024/month=08/`<br>`day=06/hour=15/`<br>`prd-prd-globalusage-`<br>`prd-1-2024-08-06-15-00-`<br>`00-eee50ddf-869a-30b7-`<br>`9d40-70df13d19b9d` |
| **Cog**         | cognito:UserName | `cog/validated/user/`<br>`${cognito:UserName}/`<br>`${year}/${month}/${day}/`<br>`${key}.json`                                                  | `cog/validated/user/`<br>`wppimagine_00u10ez2vzmo3w`<br>`nf417/2024/5/3/451ae3bc-`<br>`386a-40a5-b01c-`<br>`8b2aa4773046.png`                                                  |
| **ElevenLabs**  | cognito:UserName | `elevenlabs/validated/user/`<br>`${cognito:UserName}/`<br>`${year}/${month}/`<br>`${day}/${key}.json`                                           | `elevenlabs/validated/user/`<br>`wppimagine_00u10gxknlgzma`<br>`yhq417/2024/8/5/011f984c-`<br>`c3a8-4d95-a065-`<br>`69e763c1ad90.mp3`                                          |
| **ToolsResult** | cognito:UserName | `toolresult/validated/`<br>`user/${cognito:UserName}/`<br>`${year}/${month}/`<br>`${day}/${key}.json`                                           | `toolresult/validated/user/`<br>`wppimagine_00u10cs5ys4agvs`<br>`ap417/2024/7/22/`<br>`ac9e0c6c-81e0-4d5d-`<br>`92da-b57562d3e419.png`                                         |
| **Training**    | projectId        | `training/validated/`<br>`user/${projectId}/`<br>`${trainingModelId}/`<br>`${trainingModelVersionId}/`<br>`${key}.json`                         | `training/1282907d-91a7-4b8c-`<br>`8c4e-9d32e8b2dbf0/a7_`<br>`H8CjMqubDn_ywsXZC/`<br>`BCB6GFWeuq1-vdBykBlF/`<br>`5382f1f4-856b-4d2e-`<br>`a7d0-c3f0545f1c19.jpeg`              |
| **CloudStore**  | projectId        | `cloudstore/chats/`<br>`${type}/${entityId}/`<br>`${key}.json`                                                                                  | `cloudstore/chats/`<br>`aTxnsH9jMBuORv5Op965p/`<br>`0b8a255d-50d7-4ac4-`<br>`9b0d-05d8517f6748.json`                                                                           |
| **CloudStore**  | projectId        | `cloudstore/form/`<br>`${type}/${entityId}/`<br>`${key}.json`                                                                                   | `cloudstore/form/_5JhWIbX_y5p1xuH-`<br>`xNP/focus-group.json`                                                                                                                  |
| **CloudStore**  | projectId        | `cloudstore/`<br>`personaExperience/`<br>`${type}/${entityId}/`<br>`${key}.json`                                                                | `cloudstore/personaExperience/`<br>`0t_bUQwzM9SjxwmwBYNw/`<br>`market-researcher.json`                                                                                         |
| **CloudStore**  | projectId        | `cloudstore/personas/`<br>`${type}/${entityId}/`<br>`${key}.json`                                                                               | `cloudstore/personas/--Oxquna6Qzb3R`<br>`RKWa4H/custom.json`                                                                                                                   |
| **CloudStore**  | cognito:UserName | `cloudstore/projects/`<br>`${type}/${entityId}/`<br>`${key}.json`                                                                               | `cloudstore/projects/`<br>`wppimagine_00u10hsumapyzdo`<br>`yj417/imagineProjects.json`                                                                                         |
| **CloudStore**  | projectId        | `cloudstore/results/`<br>`${type}/${entityId}/`<br>`${key}.json`                                                                                | `cloudstore/results/-_QoKj6JbBn2gJaK`<br>`uRGq/image.json`                                                                                                                     |

### DynamoDB Microservice MAP
