import { useState, useMemo, useRef, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useAddTimespaceMutation } from "@time2world/ui-toolkit/api-slices/timespaces";
import { TimeZonesContext } from "@time2world/ui-toolkit/hooks/useTimeZones/timeZonesProvider";
import { addTimeInterval } from "@time2world/ui-toolkit/actions/timeIntervals";
import Dropdown from "@time2world/components/Dropdown";
import Select from "@time2world/components/Select";
import Input from "@time2world/components/Input";
import Button from "@time2world/components/Button";
import AddEventIcon from "@time2world/components/Icons/AddEvent";

import { selectProfile, logout } from "@time2world/ui-toolkit/api-slices/app";
import * as S from "./styled";
import TemporaryLogo from "./styled/TemporaryLogo";

const localTimezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

function Header({ showNavigation, showActions }) {
  const { tzDispatch } = useContext(TimeZonesContext);

  const dropdownRef = useRef();
  const { timespaceShortId } = useParams();
  const [showCreateTimeSpace, setShowCreateTimeSpace] = useState(false);
  const [newTimespaceName, setNewTimespaceName] = useState("");
  const [addTimespaceRequest, { isLoading: isTimespaceRequestLoading }] =
    useAddTimespaceMutation();

  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const navigate = useNavigate();

  const workspacesOptions = useMemo(
    () =>
      profile.workspaces.map((workspace) => ({
        value: workspace.id,
        label: workspace.name,
      })),
    [profile.workspaces],
  );

  const handleAddTimeInterval = useCallback((ev) => {
    const now = Date.now();
    const newId = now.toString();

    tzDispatch(
      addTimeInterval({
        id: newId,
        name: "New Time Point",
        time: now,
        mode: "float",
        actionPoint: "xPos1",
        xPos1: ev.clientX,
        xPos2: null,
        xPos1DayOffsetSeconds: null,
        xPos2DayOffsetSeconds: null,
        xPos1ClockSide: "right",
        xPos2ClockSide: "right",
        xPos1ClockCollide: null,
        xPos2ClockCollide: null,
        color: null,
        durationPixels: null,
        durationSeconds: null,
        durationHuman: null,
      }),
    );
  }, []);

  const [currentTimespace, currentWorkspace] = useMemo(() => {
    if (timespaceShortId) {
      const timespace = profile.timespaces.find(
        (ts) => ts.shortId === timespaceShortId,
      );
      return [
        timespace,
        profile.workspaces.find(
          (workspace) => workspace.id === timespace.workspaceId,
        ),
      ];
    }
    return [
      profile.timespaces[0],
      profile.workspaces.find(
        (workspace) => workspace.id === profile.timespaces[0].workspaceId,
      ),
    ];
  }, [timespaceShortId, profile.timespaces]);

  const [selectedWorkspace, setSelectedWorkspace] = useState({
    value: currentWorkspace.id,
    label: currentWorkspace.name,
  });

  const handleCreateTimespaceClick = async () => {
    const { data: newTimespace } = await addTimespaceRequest({
      body: {
        name: newTimespaceName,
        workspaceId: selectedWorkspace.value,
        timelines: [
          {
            name: localTimezoneName,
            timeZone: localTimezoneName,
            orderId: 1,
          },
        ],
      },
    });
    navigate(`/t/${newTimespace.shortId}`);
    dropdownRef.current.close();
    setNewTimespaceName("");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClickTimespace = (shortId) => {
    navigate(`/t/${shortId}`);
  };

  const handleClickWorkspace = (id) => {};

  const handleClickCreateTimespace = () => {
    log.tmp("Create Timespace clicked");
    setShowCreateTimeSpace(true);
  };

  const handleClickCreateWorkspace = () => {
    log.tmp("Create Workspace clicked");
  };

  return (
    <S.Header>
      <S.LogoLink>
        <TemporaryLogo />
        Time2World
      </S.LogoLink>
      {showNavigation && (
        <S.NavigationPanel>
          <S.NavigationItem>
            <Dropdown label="Timespaces">
              {profile.timespaces.map((timespace) => (
                <Dropdown.Item
                  key={timespace.id}
                  onClick={() => handleClickTimespace(timespace.shortId)}
                >
                  {timespace.name}
                </Dropdown.Item>
              ))}
            </Dropdown>
          </S.NavigationItem>
          <S.NavigationItem>
            <Dropdown label="Workspaces">
              {profile.workspaces.map((workspace) => (
                <Dropdown.Item
                  key={workspace.id}
                  onClick={handleClickWorkspace}
                >
                  {workspace.name}
                </Dropdown.Item>
              ))}
            </Dropdown>
          </S.NavigationItem>
          <S.NavigationItem>
            <Dropdown
              ref={dropdownRef}
              onDismiss={() => {
                setShowCreateTimeSpace(false);
              }}
              renderTrigger={(toggleDropdown) => (
                <Button onClick={toggleDropdown}>Create</Button>
              )}
            >
              {showCreateTimeSpace && (
                <S.TimespaceForm>
                  <Input.Label title="Timespace name" isRequired />
                  <Input
                    autoFocus
                    type="text"
                    placeholder="Name"
                    value={newTimespaceName}
                    onChange={(ev) => {
                      setNewTimespaceName(ev.target.value);
                    }}
                  />
                  <Input.Label title="Workspace" />
                  <Select
                    value={selectedWorkspace}
                    options={workspacesOptions}
                  />
                  <Button
                    isLoading={isTimespaceRequestLoading}
                    isDisabled={newTimespaceName.length === 0}
                    onClick={handleCreateTimespaceClick}
                  >
                    Create
                  </Button>
                </S.TimespaceForm>
              )}
              {!showCreateTimeSpace && (
                <>
                  <Dropdown.Item onClick={handleClickCreateTimespace}>
                    Create Timespace
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleClickCreateWorkspace}>
                    Create Workspace
                  </Dropdown.Item>
                </>
              )}
            </Dropdown>
          </S.NavigationItem>
          <Button
            withIcon
            onClick={(ev) => {
              handleAddTimeInterval(ev);
              log.tmp("addEvent");
            }}
          >
            <AddEventIcon size="middle" />
          </Button>
        </S.NavigationPanel>
      )}
      {showActions && (
        <S.GuestActionsList>
          <Dropdown label={`👤${profile.email}`}>
            <Dropdown.Item onClick={handleLogout}>🚪Log out</Dropdown.Item>
          </Dropdown>
        </S.GuestActionsList>
      )}
    </S.Header>
  );
}

Header.defaultProps = {
  showNavigation: true,
  showActions: true,
};

Header.propTypes = {
  showNavigation: PropTypes.bool,
  showActions: PropTypes.bool,
};

export default Header;
