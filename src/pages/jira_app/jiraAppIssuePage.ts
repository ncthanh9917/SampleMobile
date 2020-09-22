import { gondola, locator, page, action } from "gondolajs";

@page
export class JiraAppIssuePage {
    @locator public actionBar = { id: `com.atlassian.android.jira.core:id/action_bar_root`}

    @action("check comment exist", "Check comment exist")
    public async checkCommentExist(comment:string){
        await gondola.waitForElement(this.actionBar, 120);
        let commentLocation = `//android.widget.TextView[@text="Comments"]/../../following-sibling::android.widget.FrameLayout//android.widget.TextView[@text="${comment}"]`;
        let deviceSize = await gondola.getDeviceScreenSize();
        await gondola.swipeByCoordinates(deviceSize.width/2, deviceSize.height - 300, 0, -1000);
        await gondola.waitForElement(commentLocation, 30);
        await gondola.checkControlExist(commentLocation);
    }
}

export default new JiraAppIssuePage();
