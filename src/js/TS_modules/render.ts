export class Render {
  constructor(
    public storage: any,
    protected domStorage: any,
    public listComponent: any
  ) {
    this.storage = storage;
    this.domStorage = domStorage;
    this.listComponent = listComponent;
  }
  initRender(): void {
    let formattedToUser: string;
    if (this.domStorage.currentDate) {
      formattedToUser =
        " " + this.domStorage.currentDate.toString().slice(4, 15);
    } else {
      formattedToUser = this.domStorage.datePerform.innerText;
    }
    this.domStorage.datePerform.innerText = formattedToUser;

    this.domStorage.listWrapper.innerHTML = "";

    if ((+this.domStorage.currentDate).toString() in this.storage) {
      for (let key in this.storage) {
        if (key == (+this.domStorage.currentDate).toString()) {
          this.storage[key].forEach((item) => {
            this.domStorage.listWrapper.append(
              this.listComponent.getElement({
                taskContent: item.taskContent,
                isDone: item.isDone,
                randomID: item.randomID,
                taskDay: item.taskDay,
              })
            );
          });
        }
      }
    } else {
      this.domStorage.listWrapper.innerHTML =
        '<h3 style="text-align: center;">You have not tasks for this day yet!</h3>';
    }

    let daySet: object = this.domStorage.calendarBody.querySelectorAll("span");

    function converteToDate(d: string): object {
      let dateList: string[] = d.split(" ");
      return new Date(
        Date.parse(`${dateList[1]} ${dateList[2]}, ${dateList[3]}`)
      );
    }

    for (let key in daySet) {
      let currentDateDiv: HTMLElement = daySet[key].parentElement;
      let currentDateText: string;
      if (currentDateDiv) {
        currentDateText = currentDateDiv.dataset.calendarDate;
      } else {
        break;
      }
      let currentSpanDate: any = converteToDate(currentDateText);
      let spanDate: number = +daySet[key].innerText;
      let spanMonth: number = currentSpanDate.getMonth();
      let spanYear: number = currentSpanDate.getFullYear();
      if (isNaN(spanDate)) return;
      daySet[key].classList.remove("vanilla-calendar-date--has-task");
      for (let key2 in this.storage) {
        let currentDate: number = new Date(+key2).getDate();
        let currentMonth: number = new Date(+key2).getMonth();
        let currentYear: number = new Date(+key2).getFullYear();

        if (
          spanDate == currentDate &&
          spanMonth == currentMonth &&
          spanYear == currentYear
        ) {
          daySet[key].classList.add("vanilla-calendar-date--has-task");
        }
      }
    }
  }
  cleanInput(inp: HTMLInputElement): void {
    inp.value = "";
  }
}
