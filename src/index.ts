import { commands, CompleteResult, ExtensionContext, listManager, sources, workspace } from 'coc.nvim';
import { exec } from 'child_process';
import DemoList from './lists';

export async function activate(context: ExtensionContext): Promise<void> {
  // workspace.showMessage(`coc-vimonade works!`);

  context.subscriptions.push(
    commands.registerCommand('coc-vimonade.Command', async () => {
    let document = await workspace.document
    let { uri } = document
      let loc = uri.split("file://").join("")
      exec(`vimonade send ${loc}`, (error, stdout, stderr) => {
    if (error) {
      workspace.showMessage(`${error}`);
        // console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
      workspace.showMessage(`${stderr}`);
        // console.log(`stderr: ${stderr}`);
       return
    }
    // console.log(`stdout: ${stdout}`);
      workspace.showMessage(`${stdout}`);
});
    }),

    listManager.registerList(new DemoList(workspace.nvim)),

    sources.createSource({
      name: 'coc-vimonade completion source', // unique id
      shortcut: '[CS]', // [CS] is custom source
      priority: 1,
      triggerPatterns: [], // RegExp pattern
      doComplete: async () => {
        const items = await getCompletionItems();
        return items;
      }
    }),

    workspace.registerKeymap(
      ['n'],
      'coc-vimonade-keymap',
      async () => {
        workspace.showMessage(`registerKeymap`);
      },
      { sync: false }
    ),

    workspace.registerAutocmd({
      event: 'InsertLeave',
      request: true,
      callback: () => {
        workspace.showMessage(`registerAutocmd on InsertLeave`);
      }
    })
  );
}

async function getCompletionItems(): Promise<CompleteResult> {
  return {
    items: [
      {
        word: 'TestCompletionItem 1'
      },
      {
        word: 'TestCompletionItem 2'
      }
    ]
  };
}

/* interface Command { */
  // readonly id: string | string[]
  // execute(...args: any[]): void | Promise<any>
/* } */

// class AutoFixCommand implements Command {
  // public readonly id = 'tsserver.executeAutofix'
//
  // constructor(private client: VimonadeClient) {
  // }
//
  // public async execute(): Promise<void> {
    // let document = await workspace.document
    // let { uri } = document
    // if (!this.client.handles(uri)) {
      // workspace.showMessage(`Document ${uri} is not handled by tsserver.`, 'warning')
      // return
    // }
    // let file = this.client.serviceClient.toPath(document.uri)
      // if (command) commands.executeCommand(command)
  // }
// }

