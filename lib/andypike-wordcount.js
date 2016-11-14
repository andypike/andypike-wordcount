"use babel";

import AndypikeWordcountView from "./andypike-wordcount-view";
import { CompositeDisposable } from "atom";

export default {

  andypikeWordcountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.andypikeWordcountView = new AndypikeWordcountView(state.andypikeWordcountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.andypikeWordcountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "andypike-wordcount:toggle": () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.andypikeWordcountView.destroy();
  },

  serialize() {
    return {
      andypikeWordcountViewState: this.andypikeWordcountView.serialize()
    };
  },

  toggle() {
    console.log("AndypikeWordcount was toggled!");
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }
};
