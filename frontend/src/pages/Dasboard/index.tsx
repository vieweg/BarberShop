import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import pt from 'date-fns/locale/pt';
import 'react-day-picker/lib/style.css';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  Profile,
  Content,
  Schedule,
  Calendar,
  HeaderContent,
  Section,
  Appointment,
  NextAppointment,
} from './styles';

import logoImage from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface AvailabilityMonthItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hour: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { singOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [availabilityMonth, setAvailabilityMonth] = useState<
    AvailabilityMonthItem[]
  >([]);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setAvailabilityMonth(response.data);
      });
  }, [currentMonth, user]);

  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentFormatted = response.data.map(appointment => {
          return {
            ...appointment,
            hour: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        setAppointments(appointmentFormatted);
      });
  }, [selectedDate]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setSelectedDate(new Date());
    setCurrentMonth(month);
  }, []);

  const disabledDays = useMemo(() => {
    return availabilityMonth
      .filter(day => day.available === false)
      .map(day => {
        return new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          day.day,
        );
      });
  }, [availabilityMonth, currentMonth]);

  const selectedDateText = useMemo(() => {
    const dataText = [];
    dataText.push(isToday(selectedDate));
    dataText.push(format(selectedDate, "'Dia ' dd"));
    dataText.push(format(selectedDate, 'EEEE', { locale: pt }));
    return dataText;
  }, [selectedDate]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(
      appointment => parseISO(appointment.date).getHours() < 12,
    );
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(
      appointment => parseISO(appointment.date).getHours() >= 12,
    );
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Link to="/dashboard">
            <img src={logoImage} alt="Barber Shop" />
          </Link>
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={singOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {selectedDateText[0] && <span>Hoje</span>}
            <span>{selectedDateText[1]}</span>
            <span>{selectedDateText[2]}</span>
          </p>
          {selectedDateText[0] && nextAppointment && (
            <NextAppointment>
              <p>Atendimento a seguir</p>
              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hour}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>
            {morningAppointments.length === 0 && (
              <p>Sem agendamentos para este período.</p>
            )}
            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hour}
                </span>
                <div>
                  {appointment.user.avatar_url && (
                    <img
                      src={appointment.user.avatar_url}
                      alt={appointment.user.name}
                    />
                  )}
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <strong>Tarde</strong>
            {afternoonAppointments.length === 0 && (
              <p>Sem agendamentos para este período.</p>
            )}
            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hour}
                </span>
                <div>
                  {appointment.user.avatar_url && (
                    <img
                      src={appointment.user.avatar_url}
                      alt={appointment.user.name}
                    />
                  )}
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
