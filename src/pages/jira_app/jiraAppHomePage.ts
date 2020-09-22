import { gondola, locator, page, action } from "gondolajs";
import jiraWebLoginPage from "./jiraWebLoginPage";

@page
export class JiraAppHomePage {
    @locator public tbrHome = { id: `com.atlassian.android.jira.core:id/toolbar`};

    @action("select project", "Select project")
    public async selectProject(projectName:string){
        let projectLocation = `//android.widget.TextView[@text="All projects"]/following-sibling::android.view.ViewGroup//android.widget.TextView[@text="${projectName}"]`;
        await gondola.waitForElement(projectLocation, 120);
        await gondola.tap(projectLocation);
    }
}

export default new JiraAppHomePage();
