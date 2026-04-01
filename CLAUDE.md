# Claude Instructions

## Task Execution

When asked to build or implement features, use **ralphy** to execute tasks:

```bash
ralphy --prd prd.md
```

### How ralphy works
- Reads `prd.md` and executes each `- [ ]` checkbox task sequentially using Claude Code
- Tasks must be in `- [ ]` format — narrative text or `[x]` items are ignored
- Break tasks into micro-tasks (one clear action each) for best results
- Completed tasks are automatically marked `- [x]` in the file

### Workflow
1. Write or update `prd.md` with `- [ ]` micro-tasks
2. Run `ralphy --prd prd.md`
3. Ralphy loops until all tasks are checked off

### Notes
- ralphy-cli is installed globally (`npm install -g ralphy-cli`)
- Do not run as root — this environment supports it via the npm CLI version
