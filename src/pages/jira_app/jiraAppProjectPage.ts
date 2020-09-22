import { gondola, locator, page, action } from "gondolajs";

@page
export class JiraAppProjectPage {
    @locator public tbrHome = { id: `com.atlassian.android.jira.core:id/toolbar`};
    @locator public btnMenu = { id: `com.atlassian.android.jira.core:id/columnMenuBtn`};

    @action("select issue", "Select issue")
    public async selectIssue(issueName:string){
        let issueLocation = `//android.widget.TextView[@text="${issueName}"]`;
        await gondola.waitForElement(issueLocation, 120);
        await gondola.tap(issueLocation);
    }

    @action("go to done tab", "Go to done tab")
    public async goToDoneTab(){
        await gondola.waitForElement(this.btnMenu, 120);
        await gondola.swipeByCoordinates(800, 1500, -600, 0);
        await gondola.swipeByCoordinates(800, 1500, -600, 0);
    }

    @action("check issue exist", "Check issue exist")
    public async checkIssueExist(issueName:string){
        let issueLocation = `//android.widget.TextView[@text="${issueName}"]`;
        await gondola.waitForElement(issueLocation, 120);
        await gondola.checkControlExist(issueLocation);
    }
}

export default new JiraAppProjectPage();
