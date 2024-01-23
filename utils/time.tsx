import moment from 'moment';
const getTimeUpdate = (timeUpdate: any) => {
  const endTime = new Date();

  const duration = moment.duration(moment(endTime.getTime()).diff(moment(timeUpdate)));

  const hours = parseInt(duration.asHours() as any);

  const minutes = parseInt(duration.asMinutes() as any) % 60;

  const days = parseInt(duration.asDays() as any);

  const showTime = () => {
    if (Number(days) == 0 && Number(hours) == 0) {
      return <>{`${minutes} phút`} </>;
    }
    if (Number(days) > 1 || Number(days) == 1) {
      return <>{`${days} ngày`} </>;
    } else return <>{`${hours} giờ ${minutes} phút`} </>;
  };

  return showTime();
};

export { getTimeUpdate };
