import { Data, TestCase, TestModule, gondola, importData } from "gondolajs";
import jiraAppLoginPage from "../../pages/jira_app/jiraAppLoginPage";
import jiraAppHomePage from "../../pages/jira_app/jiraAppHomePage";
import jiraAppProjectPage from "../../pages/jira_app/jiraAppProjectPage";
import JiraAppLoginPage from "./../../pages/jira_app/jiraAppLoginPage";
import JiraAppHomePage from "./../../pages/jira_app/jiraAppHomePage";
import JiraAppProjectPage from "./../../pages/jira_app/jiraAppProjectPage";
TestModule("Jira App test");

Data(importData("../data/issues.json")).TestCase("Jira verify done issue", async (current: any) => {
    await JiraAppLoginPage.login();
    await JiraAppHomePage.selectProject(current.body.fields.project.name);
    await JiraAppProjectPage.goToDoneTab();
    await JiraAppProjectPage.checkIssueExist(current.body.key);
});
